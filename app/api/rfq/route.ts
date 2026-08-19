import net from "node:net";
import tls from "node:tls";
import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRFQRateLimit } from "@/lib/rfq/rate-limit";
import {
  RFQDatabaseConfigurationError,
  saveRFQRecord,
  updateRFQCustomerEmailStatus,
  updateRFQEmailStatus,
  type RFQRecord,
  type RFQReferenceBlob,
} from "@/lib/rfq/repository";
import {
  RFQValidationError,
  textValue,
  validateRFQFields,
  validateRFQReferenceFile,
} from "@/lib/rfq/validation";

export const runtime = "nodejs";

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

function smtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM_EMAIL &&
      process.env.RFQ_TO_EMAIL,
  );
}

function resendConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.RFQ_TO_EMAIL &&
      process.env.RFQ_FROM_EMAIL,
  );
}

function emailSubject(record: RFQRecord) {
  return `New RFQ — ${record.product} — ${record.company || record.name}`;
}

function emailText(record: RFQRecord) {
  const lines = [
    `New TROVANE RFQ`,
    ``,
    `Customer`,
    `Name: ${record.name}`,
    `Company: ${record.company}`,
    `Country: ${record.country}`,
    `Email: ${record.email}`,
    `WhatsApp: ${record.whatsapp || "-"}`,
    ``,
    `Inquiry`,
    `Product: ${record.product}`,
    `Quantity: ${record.quantity}`,
    `Target Price: ${record.targetPrice || "-"}`,
    ``,
    `Customization`,
    `Custom Logo: ${record.customLogo}`,
    `Custom Packaging: ${record.customPackaging}`,
    ``,
    `Requirements`,
    record.requirements,
    ``,
    `Submission`,
    `Submission time: ${record.createdAt}`,
    `RFQ ID: ${record.id}`,
    record.referenceImage
      ? `Reference image: attached (${record.referenceImage.originalName})`
      : `Reference image: -`,
  ];
  return lines.join("\r\n");
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function emailHtml(record: RFQRecord) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:7px 16px 7px 0;color:#65706a;font-size:13px;vertical-align:top;width:150px">${escapeHtml(label)}</td><td style="padding:7px 0;color:#14251f;font-size:14px;line-height:1.5">${escapeHtml(value || "-")}</td></tr>`;
  const section = (title: string, rows: string) =>
    `<h2 style="margin:26px 0 8px;color:#173c2d;font-size:15px;letter-spacing:.04em;text-transform:uppercase">${title}</h2><table role="presentation" style="border-collapse:collapse;width:100%">${rows}</table>`;

  return `<!doctype html><html><body style="margin:0;background:#f6f4ed;font-family:Arial,sans-serif;color:#14251f"><main style="max-width:640px;margin:0 auto;padding:32px 20px"><section style="background:#ffffff;border:1px solid #e7e4dc;border-radius:10px;padding:30px"><p style="margin:0 0 6px;color:#6b766f;font-size:12px;letter-spacing:.14em;text-transform:uppercase">TROVANE</p><h1 style="margin:0;color:#14251f;font-size:25px;font-weight:600">New RFQ</h1>${section("Customer", row("Name", record.name) + row("Company", record.company) + row("Country", record.country) + row("Email", record.email) + row("WhatsApp", record.whatsapp))}${section("Inquiry", row("Product", record.product) + row("Quantity", record.quantity) + row("Target Price", record.targetPrice))}${section("Customization", row("Custom Logo", record.customLogo) + row("Custom Packaging", record.customPackaging))}<h2 style="margin:26px 0 8px;color:#173c2d;font-size:15px;letter-spacing:.04em;text-transform:uppercase">Requirements</h2><div style="padding:14px 16px;background:#f6f7f3;border-radius:7px;white-space:pre-wrap;font-size:14px;line-height:1.6">${escapeHtml(record.requirements)}</div>${section("Submission", row("Submission time", record.createdAt) + row("RFQ ID", record.id) + row("Reference image", record.referenceImage ? `Attached: ${record.referenceImage.originalName}` : "-"))}</section></main></body></html>`;
}

function customerEmailSubject(record: RFQRecord) {
  return `We received your request — ${record.id} | TROVANE`;
}

function customerEmailText(record: RFQRecord) {
  const lines = [
    "TROVANE",
    "",
    "Request received",
    "",
    `Hi ${record.name},`,
    "",
    "Thank you for contacting TROVANE.",
    "",
    "We’ve received your request and our team will review the product requirements, quantity, customization details and sourcing needs.",
    "",
    `Reference: ${record.id}`,
    "",
    "Request summary:",
    `Product: ${record.product}`,
    `Quantity: ${record.quantity}`,
    `Custom Logo: ${record.customLogo}`,
    `Custom Packaging: ${record.customPackaging}`,
  ];

  if (record.targetPrice) lines.push(`Target Price: ${record.targetPrice}`);

  lines.push(
    "",
    "Response time:",
    "We typically reply within 1 business day.",
    "",
    "If you need to add any information, simply reply to this email.",
    "",
    "Best regards,",
    "TROVANE",
    "PET OUTDOOR & TRAVEL",
    "buildmetriccalc.com",
  );

  return lines.join("\r\n");
}

function customerEmailHtml(record: RFQRecord) {
  const summaryRow = (label: string, value: string) =>
    `<tr><td style="padding:7px 16px 7px 0;color:#65706a;font-size:13px;vertical-align:top;width:150px">${escapeHtml(label)}</td><td style="padding:7px 0;color:#14251f;font-size:14px;line-height:1.5">${escapeHtml(value)}</td></tr>`;
  const targetPrice = record.targetPrice
    ? summaryRow("Target Price", record.targetPrice)
    : "";

  return `<!doctype html><html><body style="margin:0;background:#f6f4ed;font-family:Arial,sans-serif;color:#14251f"><main style="max-width:640px;margin:0 auto;padding:32px 20px"><section style="background:#ffffff;border:1px solid #e7e4dc;border-radius:10px;padding:30px"><p style="margin:0 0 6px;color:#6b766f;font-size:12px;letter-spacing:.14em;text-transform:uppercase">TROVANE</p><h1 style="margin:0;color:#14251f;font-size:25px;font-weight:600">Request received</h1><p style="margin:26px 0 0;font-size:15px;line-height:1.6">Hi ${escapeHtml(record.name)},</p><p style="margin:16px 0 0;font-size:15px;line-height:1.6">Thank you for contacting TROVANE.</p><p style="margin:16px 0 0;font-size:15px;line-height:1.6">We’ve received your request and our team will review the product requirements, quantity, customization details and sourcing needs.</p><div style="margin:24px 0 0;padding:14px 16px;background:#f6f7f3;border-radius:7px"><span style="display:block;color:#65706a;font-size:12px;letter-spacing:.08em;text-transform:uppercase">Reference</span><strong style="display:block;margin-top:4px;color:#173c2d;font-size:15px">${escapeHtml(record.id)}</strong></div><h2 style="margin:26px 0 8px;color:#173c2d;font-size:15px;letter-spacing:.04em;text-transform:uppercase">Request summary</h2><table role="presentation" style="border-collapse:collapse;width:100%">${summaryRow("Product", record.product)}${summaryRow("Quantity", record.quantity)}${summaryRow("Custom Logo", record.customLogo)}${summaryRow("Custom Packaging", record.customPackaging)}${targetPrice}</table><h2 style="margin:26px 0 8px;color:#173c2d;font-size:15px;letter-spacing:.04em;text-transform:uppercase">Response time</h2><p style="margin:0;font-size:15px;line-height:1.6">We typically reply within 1 business day.</p><p style="margin:22px 0 0;font-size:15px;line-height:1.6">If you need to add any information, simply reply to this email.</p><p style="margin:26px 0 0;font-size:14px;line-height:1.6">Best regards,<br><strong>TROVANE</strong><br>PET OUTDOOR &amp; TRAVEL<br>buildmetriccalc.com</p></section></main></body></html>`;
}

function safeErrorMessage(error: unknown) {
  const secrets = [
    process.env.RESEND_API_KEY,
    process.env.BLOB_READ_WRITE_TOKEN,
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.SMTP_PASS,
  ].filter((value): value is string => Boolean(value));
  let message = error instanceof Error ? error.message : "Unknown error";
  for (const secret of secrets) message = message.replaceAll(secret, "[redacted]");
  return message.replace(/[\r\n]+/g, " ").slice(0, 1000);
}

function logEmailFailure(provider: "Resend" | "SMTP", error: unknown) {
  console.error(`[RFQ] ${provider} email delivery failed: ${safeErrorMessage(error)}`);
}

function attachmentFilename(record: RFQRecord) {
  const originalName = record.referenceImage?.originalName ?? "reference-file";
  return originalName.replace(/[\\/:*?"<>|\r\n]/g, "_").slice(0, 180);
}

async function uploadReferenceBlob({
  id,
  file,
  filename,
  originalName,
  type,
  size,
}: {
  id: string;
  file: File;
  filename: string;
  originalName: string;
  type: string;
  size: number;
}): Promise<{ blob: RFQReferenceBlob; buffer: Buffer }> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await put(`rfq/${id}/${filename}`, buffer, {
    access: "private",
    contentType: type,
    addRandomSuffix: false,
  });
  return {
    buffer,
    blob: { filename, originalName, type, size, pathname: uploaded.pathname, url: uploaded.url },
  };
}

async function sendResendEmail(record: RFQRecord, attachmentBuffer?: Buffer) {
  const apiKey = process.env.RESEND_API_KEY as string;
  const attachment = record.referenceImage && attachmentBuffer
    ? [{ filename: attachmentFilename(record), content: attachmentBuffer.toString("base64") }]
    : undefined;
  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send(
    {
      from: `TROVANE RFQ <${process.env.RFQ_FROM_EMAIL}>`,
      to: [process.env.RFQ_TO_EMAIL as string],
      replyTo: record.email,
      subject: emailSubject(record),
      html: emailHtml(record),
      text: emailText(record),
      attachments: attachment,
    },
    { idempotencyKey: `rfq-admin/${record.id}` },
  );

  if (error) {
    throw new Error(`Resend API error: ${error.message ?? "Unknown error"}`);
  }

  return { sent: true, providerId: data?.id };
}

async function sendCustomerConfirmation(record: RFQRecord) {
  if (!resendConfigured()) {
    throw new Error("Resend customer confirmation email is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY as string);
  const { data, error } = await resend.emails.send(
    {
      from: `TROVANE <${process.env.RFQ_FROM_EMAIL}>`,
      to: [record.email],
      replyTo: process.env.RFQ_TO_EMAIL as string,
      subject: customerEmailSubject(record),
      html: customerEmailHtml(record),
      text: customerEmailText(record),
    },
    { idempotencyKey: `rfq-customer/${record.id}` },
  );

  if (error) {
    throw new Error(`Resend API error: ${error.message ?? "Unknown error"}`);
  }

  return { sent: true, providerId: data?.id };
}

function smtpCommand(socket: net.Socket | tls.TLSSocket, command: string) {
  socket.write(`${command}\r\n`);
}

function readSmtpResponse(socket: net.Socket | tls.TLSSocket) {
  return new Promise<string>((resolve, reject) => {
    let data = "";
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("SMTP response timed out."));
    }, 10000);

    function cleanup() {
      clearTimeout(timeout);
      socket.off("data", onData);
      socket.off("error", onError);
    }

    function onError(error: Error) {
      cleanup();
      reject(error);
    }

    function onData(chunk: Buffer) {
      data += chunk.toString("utf8");
      const lines = data.split(/\r?\n/).filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && /^\d{3} /.test(last)) {
        cleanup();
        resolve(data);
      }
    }

    socket.on("data", onData);
    socket.on("error", onError);
  });
}

async function expectSmtp(
  socket: net.Socket | tls.TLSSocket,
  command: string | null,
  expected: number[],
) {
  if (command) smtpCommand(socket, command);
  const response = await readSmtpResponse(socket);
  const code = Number(response.slice(0, 3));
  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed: ${response.trim()}`);
  }
  return response;
}

function encodeHeader(value: string) {
  return value.replace(/[\r\n]/g, " ");
}

async function sendInternalNotification(record: RFQRecord, attachmentBuffer?: Buffer) {
  if (resendConfigured()) return sendResendEmail(record, attachmentBuffer);
  if (!smtpConfigured()) {
    console.warn("[RFQ] Email service is not configured; RFQ was saved without a notification.");
    return { sent: false };
  }

  const host = process.env.SMTP_HOST as string;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER as string;
  const pass = process.env.SMTP_PASS as string;
  const from = process.env.SMTP_FROM_EMAIL as string;
  const to = process.env.RFQ_TO_EMAIL as string;

  const socket = secure
    ? tls.connect({ host, port, servername: host })
    : net.connect({ host, port });

  try {
    await new Promise<void>((resolve, reject) => {
      socket.once("connect", resolve);
      socket.once("secureConnect", resolve);
      socket.once("error", reject);
    });

    await expectSmtp(socket, null, [220]);
    await expectSmtp(socket, `EHLO ${host}`, [250]);

    if (!secure && process.env.SMTP_STARTTLS === "true") {
      await expectSmtp(socket, "STARTTLS", [220]);
      const upgraded = tls.connect({ socket, servername: host });
      await expectSmtp(upgraded, `EHLO ${host}`, [250]);
      await expectSmtp(upgraded, `AUTH LOGIN`, [334]);
      await expectSmtp(upgraded, Buffer.from(user).toString("base64"), [334]);
      await expectSmtp(upgraded, Buffer.from(pass).toString("base64"), [235]);
      await sendMailData(upgraded, from, to, record);
      upgraded.end();
      return { sent: true };
    }

    await expectSmtp(socket, `AUTH LOGIN`, [334]);
    await expectSmtp(socket, Buffer.from(user).toString("base64"), [334]);
    await expectSmtp(socket, Buffer.from(pass).toString("base64"), [235]);
    await sendMailData(socket, from, to, record);
    socket.end();
    return { sent: true };
  } finally {
    socket.destroy();
  }
}

async function sendMailData(
  socket: net.Socket | tls.TLSSocket,
  from: string,
  to: string,
  record: RFQRecord,
) {
  const subject = emailSubject(record);
  const message = [
    `From: ${encodeHeader(from)}`,
    `To: ${encodeHeader(to)}`,
    `Reply-To: ${encodeHeader(record.email)}`,
    `Subject: ${encodeHeader(subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    ``,
    emailText(record),
    `.`,
  ].join("\r\n");

  await expectSmtp(socket, `MAIL FROM:<${from}>`, [250]);
  await expectSmtp(socket, `RCPT TO:<${to}>`, [250, 251]);
  await expectSmtp(socket, "DATA", [354]);
  await expectSmtp(socket, message, [250]);
  await expectSmtp(socket, "QUIT", [221]);
}

export async function POST(request: Request) {
  try {
    const ipAddress = getClientIp(request);
    const formData = await request.formData();

    if (textValue(formData, "website")) {
      return NextResponse.json({ ok: true, emailSent: false });
    }

    const rateLimit = checkRFQRateLimit(ipAddress);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          message: "Too many RFQ submissions. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
          },
        },
      );
    }

    const fields = validateRFQFields(formData);
    const id = `RFQ-${Date.now().toString(36).toUpperCase()}`;
    const referenceValue = formData.get("referenceImage");
    const referenceFile = referenceValue instanceof File ? referenceValue : null;
    const referenceImage = await validateRFQReferenceFile(referenceFile);

    const record: RFQRecord = {
      id,
      createdAt: new Date().toISOString(),
      ipAddress,
      ...fields,
      referenceImage,
    };

    let referenceBlob: RFQReferenceBlob | undefined;
    let attachmentBuffer: Buffer | undefined;
    if (referenceFile && referenceImage) {
      const uploaded = await uploadReferenceBlob({
        id,
        file: referenceFile,
        ...referenceImage,
      });
      referenceBlob = uploaded.blob;
      attachmentBuffer = uploaded.buffer;
    }

    try {
      await saveRFQRecord({ record, referenceBlob });
    } catch (databaseError) {
      if (referenceBlob) {
        try {
          await del(referenceBlob.url);
        } catch {
          console.error("[RFQ] Blob cleanup failed after database persistence failure.");
        }
      }
      throw databaseError;
    }

    let emailSent = false;
    try {
      const email = await sendInternalNotification(record, attachmentBuffer);
      emailSent = email.sent;
      if (email.sent) {
        try {
          await updateRFQEmailStatus({
            id: record.id,
            status: "sent",
            providerId: "providerId" in email ? email.providerId : undefined,
          });
        } catch {
          console.error("[RFQ] Failed to record successful email delivery status.");
        }
      }
    } catch (emailError) {
      const safeError = safeErrorMessage(emailError);
      logEmailFailure(resendConfigured() ? "Resend" : "SMTP", emailError);
      try {
        await updateRFQEmailStatus({
          id: record.id,
          status: "failed",
          error: safeError,
        });
      } catch {
        console.error("[RFQ] Failed to record email delivery status.");
      }
    }

    try {
      const customerEmail = await sendCustomerConfirmation(record);
      try {
        await updateRFQCustomerEmailStatus({
          id: record.id,
          status: "sent",
          providerId: customerEmail.providerId,
        });
      } catch {
        console.error("[RFQ] Failed to record successful customer confirmation email status.");
      }
    } catch (customerEmailError) {
      const safeError = safeErrorMessage(customerEmailError);
      logEmailFailure("Resend", customerEmailError);
      try {
        await updateRFQCustomerEmailStatus({
          id: record.id,
          status: "failed",
          error: safeError,
        });
      } catch {
        console.error("[RFQ] Failed to record customer confirmation email status.");
      }
    }

    return NextResponse.json({
      ok: true,
      referenceId: record.id,
      emailSent,
    });
  } catch (error) {
    const message =
      error instanceof RFQValidationError
        ? error.message
        : error instanceof RFQDatabaseConfigurationError
          ? "RFQ service is temporarily unavailable. Please try again later."
          : "The RFQ could not be submitted. Please try again.";
    const status = error instanceof RFQValidationError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
