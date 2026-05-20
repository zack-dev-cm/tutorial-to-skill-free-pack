# Shipping Readiness

Date: 2026-05-20

## Verdict

Ship the free MVP for distribution, but do not ship a paid pack.

The product is technically ready as a free proof pack and landing page. It is not commercially validated: current GitHub views, clones, stars, forks, release downloads, and feedback replies are all zero.

## What Is Ready

- Public repo: `https://github.com/zack-dev-cm/tutorial-to-skill-free-pack`
- Release ZIP: `https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0`
- First-user feedback issue: `https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1`
- Open-design landing page in `app/`
- Email update API routes:
  - `POST /api/subscribe`
  - `POST /api/notify`
  - `GET /api/unsubscribe`
- Vercel deployment guide: `docs/vercel-email-deploy.md`
- Proof cards and OpenClaw smoke receipts in `proof-cards/`

## Validation Run

Commands:

```bash
pnpm build
python3 scripts/validate_skill_artifact.py
```

Result: passed.

Browser checks:

- desktop `1440x1000`: no horizontal overflow, hero renders, open-design links render, subscribe form visible;
- mobile `390x900`: no horizontal overflow, hero renders, open-design links render, subscribe form visible.

API checks without production secrets:

- `POST /api/subscribe`: returns `503` and does not collect email when Redis/Resend env vars are missing;
- `POST /api/notify`: returns `401` without bearer secret;
- notify body now rejects non-http URLs and overlong title/summary values after auth.

## ClawPatch Review

ClawPatch status:

- `doctor`: provider `codex` detected as `codex-cli 0.36.0`;
- `map`: 13 feature slices created;
- mapped slices included Next routes, API routes, `lib`, package scripts, config, and Python scripts.

ClawPatch AI issue:

- `clawpatch review --provider codex --limit 5` failed on all 5 reviewed slices;
- failure reason: `codex provider produced no JSON output`;
- recorded run: `.clawpatch/runs/20260520T111833-8e3666.json`.

Fallback review:

- `clawpatch review --provider mock --limit 5` completed with 0 findings;
- manual review of high-risk API routes found and fixed two issues:
  - failed Resend confirmation could leave an email subscribed;
  - one failed notification email could stop the whole batch.

## Production Blockers

Vercel deployment is blocked until account auth is completed or a `VERCEL_TOKEN` is provided.

Required production env vars:

```text
NEXT_PUBLIC_SITE_URL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
RESEND_API_KEY
EMAIL_FROM
UPDATE_WEBHOOK_SECRET
UNSUBSCRIBE_SECRET
```

Email delivery should not be enabled until the sender domain is verified in Resend.

## Distribution Checklist

1. Deploy to Vercel from GitHub.
2. Add Vercel Marketplace Redis / Upstash integration.
3. Add Resend sender/domain and env vars.
4. Run subscribe smoke test with a real controlled email.
5. Run one notify smoke test to one internal subscriber.
6. Update `NEXT_PUBLIC_SITE_URL` to the final Vercel URL.
7. Replace GitHub-only CTAs in outreach with the Vercel URL.
8. Send only the 10 high-fit Day 1 replies from the prepared queue.
9. Log every touch and response.
10. Stop paid packaging until external installs or requests exist.

## Go / No-Go Gates

Go for free distribution:

- landing builds;
- skills validate;
- email system fails closed;
- source, proof cards, and feedback issue are public.

No-go for paid:

- zero public usage;
- zero feedback;
- zero downloads;
- no creator acknowledgement;
- no validated repeatable conversion request.

