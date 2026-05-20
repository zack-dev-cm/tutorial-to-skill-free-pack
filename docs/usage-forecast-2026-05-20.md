# Usage Forecast

Date: 2026-05-20

## Current Measured Baseline

GitHub telemetry:

- repo views: `0`;
- unique repo visitors: `0`;
- clones: `0`;
- release downloads: `0`;
- stars: `0`;
- forks: `0`;
- feedback replies: `0`.

This means current organic usage is effectively zero. Any forecast below assumes targeted distribution actually happens.

## Evidence Pool

Seven analyzed YouTube videos:

- total views: `541,805`;
- total likes: `27,235`;
- public/comment metadata total: `1,781`;
- sampled comments: `516`.

The sampled comments show strong workflow curiosity, but that does not translate directly into installs. Most viewers want prompts, examples, setup help, or business reassurance, not a repo clone.

Strongest distribution-relevant signals:

- `@noisygroup`: 106,217 views, 8,248 likes, 1,200 public comments; direct comments about skills not recognized, product ads, credit cost, and editing skill gaps.
- `@Officialwealthwisdom`: 45,388 views, 2,552 likes; direct comments about prompt links, cost, Higgsfield alternatives, sign-in issues, and captions/audio gaps.
- Molly Keyser: 148,240 views, 6,905 likes; strong beginner intent but weaker technical install intent.
- Sirio: 83,179 views, 5,312 likes; strong AI character workflow signal but high safety and identity-risk load.

## Realistic Conversion Model

The limiting factor is not market attention. It is the number of people who:

1. see the link;
2. understand what an OpenClaw/Codex skill is;
3. trust a GitHub repo;
4. install it;
5. run a prompt;
6. report back.

Expected cold conversion rates:

| Step | Conservative | Base | Strong |
| --- | ---: | ---: | ---: |
| Targeted touch -> link click | 2% | 6% | 15% |
| Link click -> ZIP/repo action | 8% | 18% | 35% |
| ZIP/repo action -> actual install | 20% | 35% | 55% |
| Install -> feedback/comment | 10% | 25% | 45% |

These rates are intentionally lower than creator-funnel rates because this is a technical artifact with no creator endorsement and no Vercel deployment yet.

## Forecast By Distribution Scenario

| Scenario | Distribution | 30-day repo/landing visits | Downloads/clones | Successful installs | Feedback replies |
| --- | --- | ---: | ---: | ---: | ---: |
| No outbound | Repo only | 0-5 | 0 | 0 | 0 |
| Day 1 only | 10 high-fit replies | 2-25 | 0-5 | 0-2 | 0-1 |
| Manual 100 touches | YouTube + Reddit + GitHub discussions | 40-300 | 3-55 | 1-18 | 0-8 |
| Creator acknowledgement | One creator notices or pins/replies | 200-2,000 | 20-400 | 5-120 | 2-40 |
| Vercel + newsletter/community repost | Landing link shared by a trusted technical community | 100-800 | 10-160 | 3-50 | 1-20 |

Most likely 30-day outcome without creator acknowledgement:

- visits: `40-150`;
- downloads/clones: `3-20`;
- successful installs: `1-7`;
- feedback replies: `0-3`;
- email subscribers: `0-5`.

## Segment Forecast

### OpenClaw / Codex users

Smallest audience, highest activation.

Expected from 20 targeted touches:

- 5-30 visits;
- 1-8 repo actions;
- 1-4 installs;
- 0-2 useful feedback replies.

Best message: "Can you break this proof-card pattern?"

### AI video creators

Largest apparent audience, lower install intent.

Expected from 40 targeted touches:

- 10-80 visits;
- 1-12 repo actions;
- 0-4 installs;
- 0-2 feedback replies.

Best message: "This reduces wasted generation credits and makes continuity planning explicit."

### Affiliate UGC beginners

Good pain, but high freebie-seeker risk.

Expected from 25 targeted touches:

- 5-40 visits;
- 0-8 repo actions;
- 0-2 installs;
- 0-1 feedback replies.

Best message: "This is not a revenue promise; it gives cost-risk, disclosure, and kill criteria before spending credits."

### Digital product / ebook beginners

Large audience, but the current pack does not yet match their job.

Expected from current pack:

- curiosity clicks, low install.

Expected only after `digital-product-preflight-planner` exists:

- better opt-in potential than install potential;
- likely first-use action is email subscription or tutorial request, not skill install.

## Paid Readiness Forecast

Probability of paid readiness in 30 days without creator acknowledgement: low.

Realistic estimate:

- 10 public proof cards: unlikely unless built manually;
- 5 creator/maintainer acknowledgements: unlikely;
- 3 inbound workflow requests: possible but not likely;
- 3 successful external installs: possible if 100 touches are executed;
- no major rights/safety/install pattern: achievable.

Paid launch should remain blocked unless at least three external users complete:

```text
download/clone -> install -> run one skill -> report output or failure
```

## Shutdown Rule

Keep the existing hard gate:

- park if 100 targeted touches produce fewer than 3 acknowledgements;
- park if 100 targeted touches produce zero inbound workflow requests;
- do not count likes, impressions, or generic praise as activation.

