import { NextRequest, NextResponse } from "next/server";
import { subscriberKey, subscribersSetKey } from "@/lib/subscribers";
import { sendUpdateEmail, unsubscribeUrl } from "@/lib/email";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

type NotifyPayload = {
  title?: string;
  summary?: string;
  url?: string;
};

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = process.env.UPDATE_WEBHOOK_SECRET;
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const missing = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "NEXT_PUBLIC_SITE_URL",
    "UNSUBSCRIBE_SECRET"
  ].filter((name) => !process.env[name]);
  if (missing.length) {
    return NextResponse.json({ error: `Notification backend missing: ${missing.join(", ")}.` }, { status: 503 });
  }

  const payload = (await request.json().catch(() => ({}))) as NotifyPayload;
  const title = String(payload.title ?? "").trim();
  const summary = String(payload.summary ?? "").trim();
  const url = String(payload.url ?? "").trim();
  if (!title || !summary || !url) {
    return NextResponse.json({ error: "Body must include title, summary, and url." }, { status: 400 });
  }
  if (title.length > 140 || summary.length > 1200) {
    return NextResponse.json({ error: "Title or summary is too long." }, { status: 400 });
  }
  if (!isHttpUrl(url)) {
    return NextResponse.json({ error: "URL must be http or https." }, { status: 400 });
  }

  const kv = redis();
  const emails = (await kv.smembers(subscribersSetKey)) as string[];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";

  let sent = 0;
  const failed: string[] = [];
  for (const email of emails) {
    const record = await kv.hgetall<Record<string, string>>(subscriberKey(email));
    if (record?.subscribed !== "true") {
      continue;
    }

    try {
      await sendUpdateEmail({
        to: email,
        subject: title,
        html: `
          <p>${escapeHtml(summary)}</p>
          <p><a href="${escapeAttribute(url)}">Read the update</a></p>
          <p><a href="${unsubscribeUrl(siteUrl, email)}">Unsubscribe</a></p>
        `
      });
      sent += 1;
    } catch {
      failed.push(email);
    }
  }

  return NextResponse.json({ sent, failed: failed.length });
}

function isHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
