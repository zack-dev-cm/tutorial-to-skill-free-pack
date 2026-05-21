---
version: "beta"
name: Tutorial-to-Skill Registry Landing
description: Native, evidence-first install page for two MIT-0 ClawHub skills.
colors:
  ink: "#111416"
  text: "#20262B"
  muted: "#65717D"
  quiet: "#8B96A1"
  line: "#D7DEE4"
  lineStrong: "#BBC8D3"
  paper: "#F3F5F2"
  surface: "#FFFFFF"
  surfaceWarm: "#FBFAF5"
  terminal: "#121619"
  terminalLine: "#2B3338"
  teal: "#0E7A73"
  tealDark: "#07564F"
  amber: "#B56A16"
  blue: "#2454A6"
typography:
  family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  h1:
    fontSize: "46px"
    fontWeight: 760
    lineHeight: 1.04
    letterSpacing: 0
  body:
    fontSize: "16px"
    lineHeight: 1.58
    letterSpacing: 0
rounded:
  sm: "4px"
  md: "8px"
spacing:
  pageX: "24px"
  sectionY: "56px"
components:
  command:
    backgroundColor: "{colors.terminal}"
    textColor: "#F4F7F8"
    rounded: "{rounded.md}"
  badge:
    rounded: "999px"
---

## Overview

This page is a registry install surface, not a marketing funnel. The first
viewport must answer four questions immediately:

- What is it? Two MIT-0 ClawHub skills.
- How do I install it? Exact `openclaw skills install ...` commands.
- Why should I trust it? Registry publication, runtime receipts, source links,
  and explicit safety boundaries.
- What is not promised? No paid-performance claims, copied creator prompts, or
  hidden automation.

## Layout

Use dense, native-feeling evidence blocks: command rows, compact ledgers,
tables, and restrained repeated cards. Avoid decorative hero art as primary
evidence. Generated or editorial imagery may support the product only when the
real commands and receipts stay dominant.

The hero should put install commands above secondary buttons. Skill cards should
be visible immediately after the hero on desktop and quickly reachable on
mobile.

## Trust

All claims must trace to one of:

- ClawHub registry inspect/search result;
- OpenClaw install validation;
- `proof-cards/` runtime receipt;
- `skills/*/SKILL.md` source file;
- GitHub release or issue.

Do not use testimonials, fake logos, abstract AI claims, or revenue language.

## Interaction

Copy buttons must preserve layout and expose clear feedback. Email updates are
secondary to install and inspect flows. When backend env vars are missing, the
subscribe UI must keep showing the actual configuration error.
