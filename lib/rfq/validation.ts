import crypto from "node:crypto";
import type { RFQReferenceFile } from "./repository";

export const RFQ_FILE_MAX_BYTES = 5 * 1024 * 1024;

const allowedMimeToExtension = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["application/pdf", ".pdf"],
]);

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".pdf"]);
const dangerousExtensions = new Set([
  ".apk",
  ".app",
  ".bat",
  ".bin",
  ".cmd",
  ".com",
  ".cpl",
  ".dll",
  ".dmg",
  ".exe",
  ".gadget",
  ".hta",
  ".jar",
  ".js",
  ".jse",
  ".lnk",
  ".msi",
  ".msp",
  ".pif",
  ".ps1",
  ".scr",
  ".sh",
  ".vbe",
  ".vbs",
  ".wsf",
]);

const fieldLimits = {
  name: 120,
  company: 160,
  country: 100,
  email: 254,
  whatsapp: 40,
  product: 160,
  quantity: 9,
  customLogo: 12,
  customPackaging: 12,
  targetPrice: 80,
  requirements: 3000,
  intent: 80,
} as const;

const requiredFields = [
  "name",
  "company",
  "country",
  "email",
  "product",
  "quantity",
  "customLogo",
  "customPackaging",
  "requirements",
] as const;

const customizationOptions = new Set(["Yes", "No", "Not sure"]);

export type RFQValidatedFields = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  product: string;
  quantity: string;
  customLogo: string;
  customPackaging: string;
  targetPrice: string;
  requirements: string;
  intent: string;
};

export class RFQValidationError extends Error {
  status = 400;
}

export function textValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function assertLength(key: keyof typeof fieldLimits, value: string) {
  if (value.length > fieldLimits[key]) {
    throw new RFQValidationError(
      `${labelFor(key)} must be ${fieldLimits[key]} characters or fewer.`,
    );
  }
}

function labelFor(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getExtension(filename: string) {
  const lower = filename.toLowerCase();
  const extension = lower.slice(lower.lastIndexOf("."));
  return extension.startsWith(".") ? extension : "";
}

function hasDangerousExtension(filename: string) {
  return filename
    .toLowerCase()
    .split(/(?=\.)/)
    .some((part) => dangerousExtensions.has(part));
}

async function detectFileSignature(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const asText = new TextDecoder().decode(bytes);

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (asText.startsWith("%PDF")) {
    return "application/pdf";
  }
  if (asText.startsWith("RIFF") && asText.slice(8, 12) === "WEBP") {
    return "image/webp";
  }

  return "";
}

export function validateRFQFields(formData: FormData): RFQValidatedFields {
  const missing = requiredFields.filter((field) => !textValue(formData, field));

  if (missing.length > 0) {
    throw new RFQValidationError(`Please complete: ${missing.join(", ")}.`);
  }

  const fields: RFQValidatedFields = {
    name: textValue(formData, "name"),
    company: textValue(formData, "company"),
    country: textValue(formData, "country"),
    email: textValue(formData, "email"),
    whatsapp: textValue(formData, "whatsapp"),
    product: textValue(formData, "product"),
    quantity: textValue(formData, "quantity"),
    customLogo: textValue(formData, "customLogo"),
    customPackaging: textValue(formData, "customPackaging"),
    targetPrice: textValue(formData, "targetPrice"),
    requirements: textValue(formData, "requirements"),
    intent: textValue(formData, "intent"),
  };

  for (const [key, value] of Object.entries(fields)) {
    assertLength(key as keyof typeof fieldLimits, value);
  }

  if (!isValidEmail(fields.email)) {
    throw new RFQValidationError("Please enter a valid email address.");
  }

  if (!/^[1-9]\d{0,8}$/.test(fields.quantity)) {
    throw new RFQValidationError("Quantity must be a positive whole number.");
  }

  if (!customizationOptions.has(fields.customLogo)) {
    throw new RFQValidationError("Please select a valid Custom Logo option.");
  }

  if (!customizationOptions.has(fields.customPackaging)) {
    throw new RFQValidationError("Please select a valid Custom Packaging option.");
  }

  return fields;
}

export async function validateRFQReferenceFile(
  file: File | null,
): Promise<RFQReferenceFile | undefined> {
  if (!file || file.size === 0) return undefined;

  const originalName = file.name || "reference-file";
  const originalExtension = getExtension(originalName);

  if (file.size > RFQ_FILE_MAX_BYTES) {
    throw new RFQValidationError("Reference file must be 5MB or smaller.");
  }

  if (hasDangerousExtension(originalName)) {
    throw new RFQValidationError("Reference file type is not allowed.");
  }

  if (!allowedExtensions.has(originalExtension)) {
    throw new RFQValidationError(
      "Reference file must be jpg, jpeg, png, webp, or pdf.",
    );
  }

  if (!allowedMimeToExtension.has(file.type)) {
    throw new RFQValidationError(
      "Reference file must be jpg, jpeg, png, webp, or pdf.",
    );
  }

  const detectedMime = await detectFileSignature(file);
  if (detectedMime !== file.type) {
    throw new RFQValidationError("Reference file content does not match its type.");
  }

  const extension =
    originalExtension === ".jpeg"
      ? ".jpg"
      : (allowedMimeToExtension.get(file.type) ?? originalExtension);

  return {
    filename: `${crypto.randomUUID()}${extension}`,
    originalName,
    type: file.type,
    size: file.size,
  };
}
