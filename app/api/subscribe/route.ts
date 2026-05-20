import { NextRequest, NextResponse } from "next/server";
import { isEmail, subscriberKey, subscribersSetKey } from "@/lib/subscribers";
import { sendUpdateEmail, unsubscribeUrl } from "@/lib/email";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const configError = requireSubscriptionConfig();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const payload = await request.json().catch(() => null);
  const email = String(payload?.email ?? "").trim().toLowerCase();
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const kv = redis();
  const now = new Date().toISOString();
  await kv.sadd(subscribersSetKey, email);
  await kv.hset(subscriberKey(email), {
    email,
    subscribed: "true",
    subscribedAt: now,
    source: "landing-page"
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/zack-dev-cm/tutorial-to-skill-free-pack";
  await sendUpdateEmail({
    to: email,
    subject: "Subscribed to Tutorial-to-Skill updates",
    html: `
      <p>You are subscribed to release updates for Tutorial-to-Skill Free Pack.</p>
      <p>Current release: <a href="https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0">v0.1.0</a></p>
      <p>Feedback issue: <a href="https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1">first-user testing</a></p>
      <p><a href="${unsubscribeUrl(siteUrl, email)}">Unsubscribe</a></p>
    `
  });

  return NextResponse.json({ message: "Subscribed. Check your inbox for a confirmation email." });
}

function requireSubscriptionConfig() {
  const missing = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RESEND_API_KEY",
    "EMAIL_FROM",
    "NEXT_PUBLIC_SITE_URL",
    "UNSUBSCRIBE_SECRET"
  ].filter((name) => !process.env[name]);

  if (missing.length) {
    return `Subscription backend is not configured yet. Missing: ${missing.join(", ")}.`;
  }
  return null;
}
