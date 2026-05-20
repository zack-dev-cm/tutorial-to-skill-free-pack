# Proof Card: AI Video Scene Director

Date: 2026-05-20

## Input

- Source video: https://www.youtube.com/watch?v=0YhhPQVXA7c
- Channel: JOEY, `@noisygroup`
- Local evidence file: `yt-skill-pack-research/evidence-summary.json`

## Output

- Skill folder: `yt-skill-pack-research/skills/ai-video-scene-director`
- Required skill file: `yt-skill-pack-research/skills/ai-video-scene-director/SKILL.md`
- Evidence reference: `yt-skill-pack-research/skills/ai-video-scene-director/references/source-evidence.md`

## What Was Converted

Public tutorial themes were converted into an original reusable skill for AI video planning:

- character continuity;
- scene plate planning;
- reference image sequence;
- multi-shot prompt tables;
- credit-aware generation order;
- repair prompts for common AI video failures.

## What Was Not Converted

- No source transcript redistribution.
- No paid or downloaded prompt file redistribution.
- No guarantee of views, income, ranking, or platform performance.
- No adult/deepfake/spam workflow support.

## ClawPath / OpenClaw Fit

The skill follows the shortest useful path:

1. One user idea in.
2. One structured production plan out.
3. One generation order to reduce wasted credits.
4. One done-criteria checklist before further tool use.

OpenClaw compatibility:

- `SKILL.md` exists.
- Frontmatter includes `name` and `description`.
- Metadata is single-line JSON.
- The skill can be copied into an OpenClaw workspace `skills/` directory or `~/.openclaw/skills/`.

## Test Prompt

Use this prompt after installing or loading the skill:

```text
Use ai-video-scene-director to plan a 20-second cyberpunk product teaser for wireless earbuds. I want 4 shots, a female courier character, rainy alley setting, realistic camera language, and a low credit budget.
```

Expected result:

- concept paragraph;
- continuity bible;
- reference prompts;
- 4-shot table;
- generation order;
- credit risk;
- repair prompts;
- done criteria.

## Validation Status

Static validation: passed with `scripts/validate_skill_artifact.py`.

OpenClaw skill visibility: passed in isolated profile `yt-skill-proof`; `openclaw --profile yt-skill-proof skills info ai-video-scene-director --json` reported `eligible: true`, `modelVisible: true`, and `commandVisible: true`.

Runtime validation: passed through OpenClaw embedded fallback. Gateway connection for the isolated profile reported a token mismatch against the already-running default gateway, then OpenClaw ran the embedded agent successfully with the skill injected. Corrected rerun session `ai-video-scene-director-rerun-20260520` started directly with `concept` and produced the expected production-plan sections.
