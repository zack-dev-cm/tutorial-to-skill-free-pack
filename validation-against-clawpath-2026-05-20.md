# Validation Against ClawPath / OpenClaw

Date: 2026-05-20

## Verdict

Decision: Rework before paid shipping. Free proof artifact now implemented.

The YouTube-to-skill-pack idea is directionally aligned with the existing `Trend-to-Skill Factory`. The narrower proposal now has two OpenClaw-compatible proof artifacts, but it should still remain free until public install/use data exists.

## ClawPath / OpenClaw Usage Baseline

ClawPath setup guidance emphasizes:

- finish the shortest install path before advanced workflows;
- validate with `openclaw --version`, `openclaw gateway status`, `openclaw dashboard`, `openclaw doctor`, and a minimal `openclaw run --prompt "Hello"`;
- judge success after installation by whether OpenClaw can receive input, process something useful, and return the result somewhere the user reads;
- treat ClawPath as a shorter path layer, while official OpenClaw docs win on version-specific details.

OpenClaw skill docs require an AgentSkills-compatible folder with a `SKILL.md`, YAML frontmatter, and concise usage instructions. Skills can live in bundled, managed/local, or workspace locations, with workspace skills taking precedence. Third-party skills should be treated as untrusted and reviewed before enabling.

## Hard Data

Current date used for velocity: 2026-05-20.

| Rank | Channel | Days live | Views/day | Like rate | Comments/1k views | Need comments sampled | Risk comments sampled | Score |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | `@noisygroup` | 10 | 10621.7 | 7.77% | 11.30 | 22/100, 22.0% | 0/100, 0.0% | 75.8 |
| 2 | `@Officialwealthwisdom` | 7 | 6484.0 | 5.62% | 4.12 | 49/100, 49.0% | 1/100, 1.0% | 61.9 |
| 3 | `@n8wealth` | 9 | 2657.4 | 7.19% | 1.17 | 6/26, 23.1% | 0/26, 0.0% | 43.6 |
| 4 | `@traffic_system` | 23 | 1469.8 | 3.14% | 3.76 | 22/71, 31.0% | 6/71, 8.5% | 38.0 |
| 5 | `@DesignCourse` | 90 | 1122.9 | 1.42% | 0.51 | 15/32, 46.9% | 0/32, 0.0% | 26.1 |

Score formula:

- max 30 points for views/day;
- max 20 for like rate;
- max 20 for comments per 1k views;
- max 20 for sampled need-comment rate;
- max 10 for chapter structure;
- minus up to 25 for sampled risk-comment rate.

## Review Gates

| Gate | Requirement | Result | Reason |
| --- | --- | --- | --- |
| Exact painful job | User wants an installable skill from one public workflow video. | Pass | Comments repeatedly ask for prompts, setup, workflow files, cost clarity, and install help. |
| ClawPath path fit | Must reduce choices and send user to the shortest working path. | Partial | The proposal still talks about packs and courses before proving one installable loop. |
| OpenClaw skill compatibility | Must output `SKILL.md` with frontmatter, location, install, and invocation notes. | Pass | `skills/ai-video-scene-director/SKILL.md` exists and OpenClaw reports it as eligible/model-visible/command-visible in profile `yt-skill-proof`. |
| Local validation | Must pass minimal OpenClaw install/run verification or provide explicit fallback. | Partial pass | Static validator passed. Runtime prompt passed through OpenClaw embedded fallback; isolated profile gateway token mismatch remains an install-guide caveat. |
| Security/trust | Must cite sources, avoid copying protected material, exclude unsafe workflows, and warn about third-party skills. | Partial | Safe direction is clear, but the previous proposal underweighted supply-chain and content-rights review. |
| First traffic source | Must identify the first 100 concrete touches. | Partial | Existing SourcePack gate suggests manual X replies and proof-card posts; YouTube comments alone are not a reliable direct channel. |
| Share trigger | User must receive a public proof card or repo link worth sharing. | Pass for free MVP | Proof card and runtime receipt are present under `proof-cards/`. |
| Paid readiness | Must have activation data before monetization. | Fail | No installs, acknowledgements, forks, or inbound conversion requests yet. |

## Hard Decision

Do not ship the paid pack.

Ship only the free, narrow MVP. The first two proof artifacts are now built:

1. `skills/ai-video-scene-director/SKILL.md`
2. `skills/affiliate-ugc-test-planner/SKILL.md`
3. `skills/*/references/source-evidence.md`
4. `proof-cards/*-proof-card.md`
5. `proof-cards/*-proof-card.json`
6. `proof-cards/*-runtime-receipt.md`
7. `proof-cards/*-openclaw-smoke.json`
8. `skill-pack-manifest.json`
9. `scripts/validate_skill_artifact.py`
10. `scripts/openclaw_smoke_test_skill.py`
11. `scripts/run_all_tests.sh`

## Better Product Shape

Name: `Tutorial-to-Skill Proof Card`

Promise: Turn one public AI workflow tutorial into a reviewable OpenClaw/Codex skill with sources, install notes, and a proof card.

Free MVP:

- one URL in;
- one skill folder out;
- one proof card;
- one install/test recipe;
- one safety and rights checklist.

Paid product waits until:

- 10 public proof cards;
- 5 creator acknowledgements;
- 3 inbound workflow requests;
- 3 successful user installs or forks;
- no major copyright, unsafe-workflow, or setup-failure pattern.

Shutdown threshold:

- park the product if 100 targeted touches produce fewer than 3 acknowledgements or zero inbound workflow requests by day 30.
