# Deployment Validation

Date: 2026-05-20

## Scope

Deploy the free tutorial-to-skill MVP pack into OpenClaw and validate:

- static pack integrity;
- default-profile install and visibility;
- isolated-profile runtime behavior;
- distributable archive integrity.

## Deployed Skills

- `ai-video-scene-director`
- `affiliate-ugc-test-planner`

## Default OpenClaw Profile

Command:

```bash
scripts/run_deployment_validation.sh default --skip-runtime
```

Result: passed install and visibility validation.

Deployment receipt:

- `deployments/openclaw-default-deployment-latest.json`

Targets:

- `~/.openclaw/skills/ai-video-scene-director`
- `~/.openclaw/skills/affiliate-ugc-test-planner`

OpenClaw reported both skills as:

- source: `openclaw-managed`
- eligible: `true`
- modelVisible: `true`
- commandVisible: `true`
- missing requirements: none

Runtime was skipped for the default profile because the default `main` agent is configured for `openai-codex/gpt-5.3-codex` and currently lacks usable provider auth. Earlier runtime attempt failed with:

```text
No API key found for provider "openai-codex".
```

This is an OpenClaw agent-auth configuration issue, not a skill packaging issue.

## Isolated Runtime Profile

Command:

```bash
scripts/run_deployment_validation.sh yt-skill-proof
```

Result: passed install, visibility, runtime smoke tests, and archive packaging.

Deployment receipt:

- `deployments/openclaw-yt-skill-proof-deployment-latest.json`

Runtime smoke receipts:

- `proof-cards/ai-video-scene-director-openclaw-smoke.json`
- `proof-cards/affiliate-ugc-test-planner-openclaw-smoke.json`

Latest runtime summaries:

- `ai-video-scene-director`: passed, provider `openai`, model `gpt-5.5`, transport `embedded`, fallback from `gateway`, output 6,913 chars.
- `affiliate-ugc-test-planner`: passed, provider `openai`, model `gpt-5.5`, transport `embedded`, fallback from `gateway`, output 9,444 chars.

The isolated profile still falls back from gateway to embedded runtime because its token does not match the already-running default gateway. Embedded runtime completes successfully.

## Archive

Latest archive:

- `dist/tutorial-to-skill-free-pack-latest.zip`

Versioned archive:

- `dist/tutorial-to-skill-free-pack-20260520T113902.zip`

Archive integrity:

```text
No errors detected in compressed data of dist/tutorial-to-skill-free-pack-latest.zip.
```

## Hard Gate Status

Pass:

- static pack validation;
- OpenClaw managed deployment;
- OpenClaw skill visibility;
- runtime smoke in isolated profile;
- archive integrity.

Blocked:

- default-profile runtime until the default OpenClaw `main` agent has usable model auth.
- paid release until external install/use data exists.
