# Runtime Receipt: AI Video Scene Director

Date: 2026-05-20

## Commands

```bash
scripts/validate_skill_artifact.py
openclaw --profile yt-skill-proof skills check --json
openclaw --profile yt-skill-proof skills info ai-video-scene-director --json
openclaw --profile yt-skill-proof agent --agent main --message '<test prompt>' --json --timeout 180
```

## Results

- Static artifact validation: passed.
- OpenClaw installed version: `2026.5.7`.
- Gateway status: running on `127.0.0.1:18789` with connectivity probe ok.
- Isolated profile skill check: `ai-video-scene-director` appeared in `eligible`, `modelVisible`, and `commandVisible`.
- Skill info: source `openclaw-managed`, bundled `false`, eligible `true`, missing requirements empty.
- Runtime prompt: succeeded through embedded fallback after gateway token mismatch for the isolated profile.
- Model reported by runtime metadata: `gpt-5.5`.
- Corrected rerun session: `ai-video-scene-director-rerun-20260520`.
- Automated smoke receipt: `proof-cards/ai-video-scene-director-openclaw-smoke.json`.
- Automated smoke result: passed, no failures, runtime transport `embedded`, fallback from `gateway`, output length 9,138 characters.

## Runtime Output Shape

The corrected runtime answer started directly with the deliverable and produced the expected sections:

- concept;
- continuity bible;
- reference prompts;
- shot table;
- generation order;
- video prompts;
- credit risk;
- repair prompts;
- done criteria.

## Remaining Issue

The isolated profile could not use the already-running gateway because its token did not match the default gateway token. OpenClaw handled this by running the embedded agent successfully. For a public install guide, either use the default profile or run a matching isolated gateway for the chosen profile.
