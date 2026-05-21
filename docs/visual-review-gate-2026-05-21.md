# Visual Review Gate - 2026-05-21

## Scope

Public landing page redesign after the previous UI failed the marketplace-install task.

Primary user job:

```bash
openclaw skills install ai-video-scene-director
openclaw skills install affiliate-ugc-test-planner
```

## Harsh Diagnosis Of Previous UI

- It led with philosophy instead of the installable product.
- It hid the exact ClawHub commands below generic CTAs.
- The proof card said "receipts" but did not expose command-level evidence.
- The black metric strip looked like SaaS decoration and competed with the actual install path.
- Mobile stacked generic buttons before the real commands.
- "Install from ClawHub" was a claim, not an inspectable action.

## Web Research Applied

- Material Design responsive layout guidance: use consistent responsive grids, margins, and gutters across breakpoints.
  - https://m1.material.io/layout/responsive-ui.html
- W3C/WAI focus appearance guidance: custom focus indicators must remain visible and distinguishable.
  - https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html
- W3C/WAI target-size guidance: custom targets should be at least 44 by 44 CSS pixels for touch reliability.
  - https://w3c.github.io/wcag/understanding/target-size-enhanced.html
- ClawHub skill format: skills are folders with `SKILL.md`; `description` powers UI/search; ClawHub-published skills are MIT-0; paid skills/pricing metadata are not supported.
  - https://github.com/openclaw/clawhub/blob/main/docs/skill-format.md
- ClawHub project docs: registry supports browse, publish, version, search, install, and inspect flows for text-based agent skills.
  - https://github.com/openclaw/clawhub
  - https://docs.openclaw.ai/tools/clawhub

## Redesign Decisions

- Replaced generic hero with a registry-style install surface.
- Put exact install commands in the first viewport.
- Added native copy buttons for every command.
- Renamed ambiguous "Inspect" to "Source".
- Shortened headline to the concrete action: install two open ClawHub skills.
- Replaced heavy black metric strip with a quieter proof row.
- Kept slugs intact when commands wrap on mobile.
- Hid duplicate mobile hero CTAs so mobile reaches commands earlier.
- Preserved strict trust boundary: no testimonials, fake logos, fake screenshots, revenue promises, or paid-skill implication.

## Native Vision Review

Strict reviewer: GPT-5.5, extra-high reasoning, visual screenshots.

Initial reviewer verdict:

- Not shippable.
- Blocking failures: mobile did not expose both install commands early enough, command wrapping hurt verification, labels were ambiguous, proof strip was too heavy.

Final reviewer verdict:

- Shippable.
- Final score: `8.9/10`.

Final category scores:

- Product clarity: `9/10`
- Install confidence: `9/10`
- Proof quality: `8.7/10`
- Trust restraint: `10/10`
- Desktop first viewport: `8.8/10`
- Mobile usability: `8.6/10`
- Marketplace fit: `9/10`

Remaining non-blocking issues:

- Mobile nav is dense on narrow widths.
- Verify command can sit partly below the first mobile viewport, but the two primary install commands are visible.
- Desktop hero could become slightly denser in a future iteration.

## Mechanical Verification

Validated local production render after `next build`:

- `320x900`
- `390x900`
- `768x1000`
- `1440x1000`

Results:

- No horizontal overflow.
- Three command rows present.
- Both install commands render exactly.
- Copy buttons present for all commands.
- Visible interactive targets are at least `44px` high.
- Focus indicator exists (`3px solid` outline).
- `pnpm check:ship` passed.
