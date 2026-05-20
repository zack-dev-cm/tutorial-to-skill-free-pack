import { NextRequest, NextResponse } from "next/server";
import { isEmail, subscriberKey, subscribersSetKey } from "@/lib/subscribers";
import { verifySignature } from "@/lib/email";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const email = String(request.nextUrl.searchParams.get("email") ?? "").trim().toLowerCase();
  const sig = String(request.nextUrl.searchParams.get("sig") ?? "");

  if (!process.env.UNSUBSCRIBE_SECRET || !isEmail(email) || !verifySignature(email, sig)) {
    return new Response("Invalid unsubscribe link.", { status: 400 });
  }

  const kv = redis();
  await kv.srem(subscribersSetKey, email);
  await kv.hset(subscriberKey(email), {
    subscribed: "false",
    unsubscribedAt: new Date().toISOString()
  });

  return new Response("Unsubscribed from Tutorial-to-Skill release updates.", {
    status: 200,
    headers: { "content-type": "text/plain; charset=utf-8" }
  });
}
