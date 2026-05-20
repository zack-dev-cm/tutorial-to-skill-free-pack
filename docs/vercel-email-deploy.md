# Vercel Email Update Deployment

This repo is ready for Vercel deployment, but production email updates require configured secrets.

## Required Integrations

1. Vercel project connected to this GitHub repo.
2. Vercel Marketplace Redis / Upstash integration.
3. Resend API key and verified sender/domain.

## Environment Variables

Set these in Vercel Project Settings:

```text
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=...
EMAIL_FROM=Tutorial-to-Skill <updates@yourdomain.com>
UPDATE_WEBHOOK_SECRET=long-random-secret
UNSUBSCRIBE_SECRET=another-long-random-secret
```

## Smoke Tests

After deployment:

```bash
curl -sS https://your-vercel-domain.vercel.app/
curl -sS -X POST https://your-vercel-domain.vercel.app/api/subscribe \
  -H 'content-type: application/json' \
  -d '{"email":"you@example.com"}'
```

Send an update:

```bash
curl -sS -X POST https://your-vercel-domain.vercel.app/api/notify \
  -H "authorization: Bearer $UPDATE_WEBHOOK_SECRET" \
  -H 'content-type: application/json' \
  -d '{
    "title":"Tutorial-to-Skill update",
    "summary":"New release notes or proof-card changes.",
    "url":"https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases"
  }'
```

Expected behavior:

- subscribe returns success and sends a confirmation email;
- notify returns `{"sent":N}`;
- unsubscribe link removes the email from future sends.

Without Redis/Resend env vars, `/api/subscribe` returns `503` and does not collect emails.

