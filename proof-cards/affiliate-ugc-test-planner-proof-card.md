# Proof Card: Affiliate UGC Test Planner

Date: 2026-05-20

## Input

- Source video: https://www.youtube.com/watch?v=EYZKlJmFUXw
- Channel: Wealth Wisdom, `@Officialwealthwisdom`
- Local evidence file: `yt-skill-pack-research/evidence-summary.json`

## Output

- Skill folder: `yt-skill-pack-research/skills/affiliate-ugc-test-planner`
- Required skill file: `yt-skill-pack-research/skills/affiliate-ugc-test-planner/SKILL.md`
- Evidence reference: `yt-skill-pack-research/skills/affiliate-ugc-test-planner/references/source-evidence.md`

## What Was Converted

Public tutorial themes and comment objections were converted into an original affiliate UGC test-planning skill:

- product fit review;
- compliance and disclosure flags;
- hook matrix;
- video and carousel briefs;
- platform/link handling;
- cost-risk controls;
- day-3 and day-7 test metrics;
- kill criteria.

## What Was Not Converted

- No source transcript redistribution.
- No paid or downloaded prompt file redistribution.
- No promise of affiliate revenue, views, sales, ranking, or virality.
- No platform-policy bypass instructions.
- No fake testimonial or undisclosed AI customer-review workflow.

## ClawPath / OpenClaw Fit

The skill follows the shortest useful path:

1. One product or niche in.
2. One small compliant test plan out.
3. One content matrix before spending credits.
4. One kill rule before scaling.

OpenClaw compatibility:

- `SKILL.md` exists.
- Frontmatter includes `name` and `description`.
- Metadata is single-line JSON.
- The skill can be copied into an OpenClaw workspace `skills/` directory or `~/.openclaw/skills/`.

## Test Prompt

Use this prompt after installing or loading the skill:

```text
Use affiliate-ugc-test-planner to plan a 7-day organic test for a magnesium sleep supplement on Pinterest and TikTok. Assume I have not personally used the product yet, have a low AI generation budget, and need disclosure-safe copy.
```

Expected result:

- offer fit;
- compliance flags;
- hook matrix;
- two video briefs;
- one carousel brief;
- platform plan;
- cost risk;
- test metrics;
- kill criteria.

## Validation Status

Static validation: passed with `scripts/validate_skill_artifact.py`.

OpenClaw visibility/runtime validation: passed with `scripts/openclaw_smoke_test_skill.py`.

Automated smoke receipt: `proof-cards/affiliate-ugc-test-planner-openclaw-smoke.json`.

Runtime used OpenClaw embedded fallback after the isolated profile could not attach to the already-running default gateway token. The skill was still injected and validated.
