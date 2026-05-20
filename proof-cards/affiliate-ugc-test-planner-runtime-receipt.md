# Runtime Receipt: Affiliate UGC Test Planner

Date: 2026-05-20

## Commands

```bash
scripts/validate_skill_artifact.py
scripts/openclaw_smoke_test_skill.py --skill affiliate-ugc-test-planner
scripts/openclaw_smoke_test_skill.py --skill affiliate-ugc-test-planner --run-agent --timeout 180
```

## Expected Runtime Output Shape

- offer fit;
- compliance flags;
- hook matrix;
- video briefs;
- carousel brief;
- platform plan;
- cost risk;
- test metrics;
- kill criteria.

## Results

- Static artifact validation: passed.
- OpenClaw installed version: `2026.5.7`.
- Isolated profile skill check: `affiliate-ugc-test-planner` appeared as eligible, model-visible, and command-visible.
- Skill info: source `openclaw-managed`, bundled `false`, eligible `true`, missing requirements empty.
- Runtime prompt: passed through OpenClaw embedded fallback.
- Runtime receipt: `proof-cards/affiliate-ugc-test-planner-openclaw-smoke.json`.
- Runtime metadata: provider `openai`, model `gpt-5.5`, transport `embedded`, fallback from `gateway`, output length 7,757 characters.

## Remaining Issue

The isolated profile could not use the already-running gateway because its token did not match the default gateway token. OpenClaw handled this by running the embedded agent successfully. For a public install guide, either use the default profile or run a matching isolated gateway for the chosen profile.
