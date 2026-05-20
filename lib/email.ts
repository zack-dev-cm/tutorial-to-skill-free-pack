import { createHmac, timingSafeEqual } from "crypto";

type EmailInput = {
  to: string;
  subject: string;
  html: string;
};

export async function sendUpdateEmail(input: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("Email backend is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: input.to,
      subject: input.subject,
      html: input.html
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend rejected email: ${response.status} ${text}`);
  }
}

export function unsubscribeUrl(siteUrl: string, email: string) {
  const url = new URL("/api/unsubscribe", siteUrl);
  url.searchParams.set("email", email);
  url.searchParams.set("sig", signEmail(email));
  return url.toString();
}

export function signEmail(email: string) {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) {
    throw new Error("UNSUBSCRIBE_SECRET is not configured.");
  }
  return createHmac("sha256", secret).update(email).digest("hex");
}

export function verifySignature(email: string, signature: string) {
  const expected = signEmail(email);
  const actual = Buffer.from(signature, "hex");
  const target = Buffer.from(expected, "hex");
  return actual.length === target.length && timingSafeEqual(actual, target);
}

