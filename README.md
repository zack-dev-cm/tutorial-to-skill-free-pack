# Tutorial-to-Skill Free Pack

Turn public AI workflow tutorials into reviewable OpenClaw/Codex skill artifacts.

This first free pack contains two tested skills:

- `ai-video-scene-director`: plans low-waste AI video scenes with continuity, shot order, repair prompts, and credit-risk controls.
- `affiliate-ugc-test-planner`: plans disclosure-safe affiliate UGC tests with hook matrices, video briefs, cost risks, metrics, and kill criteria.

Public repo: https://github.com/zack-dev-cm/tutorial-to-skill-free-pack

Release ZIP: https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/releases/tag/v0.1.0

ClawHub slugs:

- `ai-video-scene-director`
- `affiliate-ugc-test-planner`

First-user feedback: https://github.com/zack-dev-cm/tutorial-to-skill-free-pack/issues/1

Deploy landing page: https://vercel.com/new/clone?repository-url=https://github.com/zack-dev-cm/tutorial-to-skill-free-pack&project-name=tutorial-to-skill-free-pack&repository-name=tutorial-to-skill-free-pack

## Why This Exists

The source video comments showed repeated beginner pain:

- "send all prompts";
- "the skill is not recognized";
- "does this work outside Claude/Higgsfield?";
- "credits get expensive fast";
- "what tool/app/template is this?";
- "is this free or paid?";
- "can I use Codex/OpenClaw instead?"

This pack is not a paid course and not a promise of revenue. It is a small proof that a tutorial can become a plain-text skill folder with source notes and runtime receipts.

## Install

Inspect the files first. Each skill is a plain `SKILL.md` plus a reference note.

ClawHub install:

```bash
openclaw skills install ai-video-scene-director
openclaw skills install affiliate-ugc-test-planner
openclaw skills info
```

## Vercel Landing And Email Updates

The repo includes a Vercel-ready Next.js landing page. The email update flow is opt-in only:

- `POST /api/subscribe` validates an email, stores it in Vercel Marketplace Redis / Upstash, and sends a confirmation through Resend.
- `POST /api/notify` sends an update only to subscribed emails and requires `Authorization: Bearer $UPDATE_WEBHOOK_SECRET`.
- `GET /api/unsubscribe` removes a signed subscriber from the update list.

Required production environment variables are listed in `.env.example`.
Deployment notes are in `docs/vercel-email-deploy.md`.
Shipping status and usage forecast are in:

- `docs/shipping-readiness-2026-05-20.md`
- `docs/usage-forecast-2026-05-20.md`

Manual install:

```bash
mkdir -p ~/.openclaw/skills
cp -R skills/ai-video-scene-director ~/.openclaw/skills/
cp -R skills/affiliate-ugc-test-planner ~/.openclaw/skills/
openclaw skills info
```

Scripted install from the unpacked folder:

```bash
python3 scripts/deploy_openclaw_pack.py --profile default
openclaw skills info
```

Validate the pack:

```bash
python3 scripts/validate_skill_artifact.py
scripts/run_deployment_validation.sh yt-skill-proof
```

## Try It

Ask OpenClaw:

```text
Use ai-video-scene-director to plan a 20-second cyberpunk product teaser for wireless earbuds. I want 4 shots, one consistent courier character, a rainy alley setting, realistic camera language, and a low credit budget.
```

Or:

```text
Use affiliate-ugc-test-planner to plan a 7-day organic test for a magnesium sleep supplement on Pinterest and TikTok. Assume I have not personally used the product yet, have a low AI generation budget, and need disclosure-safe copy.
```

## Trust Notes

- The skills are plain text.
- No skill requires secrets, browser cookies, wallet access, or shell commands.
- The validation scripts are separate from the skills and can be reviewed line by line.
- Paid release is blocked until real users install or request workflow conversions.

## Evidence

- Hard-gate review: `validation-against-clawpath-2026-05-20.md`
- Deployment validation: `deployments/deployment-validation-2026-05-20.md`
- Proof cards: `proof-cards/`
- Pack manifest: `skill-pack-manifest.json`
