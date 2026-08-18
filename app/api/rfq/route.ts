import net from "node:net";
import tls from "node:tls";
import { NextResponse } from "next/server";
import { checkRFQRateLimit } from "@/lib/rfq/rate-limit";
import {
  saveRFQRecord,
  saveRFQReferenceFile,
  readRFQReferenceFile,
  type RFQRecord,
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

function logEmailFailure(provider: "Resend" | "SMTP", error: unknown) {
  const apiKey = process.env.RESEND_API_KEY;
  const rawMessage = error instanceof Error ? error.message : String(error);
  const safeMessage = apiKey ? rawMessage.replaceAll(apiKey, "[redacted]") : rawMessage;
  console.error(`[RFQ] ${provider} email delivery failed: ${safeMessage}`);
}

function attachmentFilename(record: RFQRecord) {
  const originalName = record.referenceImage?.originalName ?? "reference-file";
  return originalName.replace(/[\\/:*?"<>|\r\n]/g, "_").slice(0, 180);
}

async function sendResendEmail(record: RFQRecord) {
  const apiKey = process.env.RESEND_API_KEY as string;
  const attachment = record.referenceImage
    ? [{
        filename: attachmentFilename(record),
        content: (await readRFQReferenceFile(record.referenceImage.filename)).toString("base64"),
      }]
    : undefined;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": record.id,
    },
    body: JSON.stringify({
      from: `TROVANE RFQ <${process.env.RFQ_FROM_EMAIL}>`,
      to: [process.env.RFQ_TO_EMAIL],
      reply_to: record.email,
      subject: emailSubject(record),
      html: emailHtml(record),
      text: emailText(record),
      attachments: attachment,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend API responded with ${response.status}: ${detail.slice(0, 500)}`);
  }

  return true;
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

async function sendEmail(record: RFQRecord) {
  if (resendConfigured()) return sendResendEmail(record);
  if (!smtpConfigured()) {
    console.warn("[RFQ] Email service is not configured; RFQ was saved without a notification.");
    return false;
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
      return true;
    }

    await expectSmtp(socket, `AUTH LOGIN`, [334]);
    await expectSmtp(socket, Buffer.from(user).toString("base64"), [334]);
    await expectSmtp(socket, Buffer.from(pass).toString("base64"), [235]);
    await sendMailData(socket, from, to, record);
    socket.end();
    return true;
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

    if (referenceFile && referenceImage) {
      await saveRFQReferenceFile({
        file: referenceFile,
        filename: referenceImage.filename,
      });
    }

    const record: RFQRecord = {
      id,
      createdAt: new Date().toISOString(),
      ipAddress,
      ...fields,
      referenceImage,
    };

    await saveRFQRecord(record);
    let emailSent = false;
    try {
      emailSent = await sendEmail(record);
    } catch (emailError) {
      logEmailFailure(resendConfigured() ? "Resend" : "SMTP", emailError);
    }

    return NextResponse.json({
      ok: true,
      referenceId: record.id,
      emailSent,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The RFQ could not be submitted. Please try again.";
    const status = error instanceof RFQValidationError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
