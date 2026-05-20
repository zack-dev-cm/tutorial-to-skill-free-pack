---
version: "alpha"
name: Tutorial-to-Skill Landing System
description: Evidence-first landing page for a free OpenClaw/Codex skill pack.
colors:
  ink: "#151719"
  muted: "#5E666F"
  line: "#D8DEE5"
  paper: "#F7F8F5"
  surface: "#FFFFFF"
  accent: "#0F766E"
  accentDark: "#0B4F49"
  signal: "#B45309"
typography:
  family: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  h1:
    fontSize: "48px"
    fontWeight: 760
    lineHeight: 1.04
    letterSpacing: 0
  body:
    fontSize: "16px"
    lineHeight: 1.62
    letterSpacing: 0
rounded:
  sm: "4px"
  md: "8px"
spacing:
  pageX: "24px"
  sectionY: "72px"
components:
  buttonPrimary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
---

## Overview

The page should feel like a release artifact, not a hype funnel. The first viewport must show the product name, exact free deliverable, validation facts, and subscription path.

## Layout

Use full-width bands with constrained inner content. Cards are only for repeated proof items, skill summaries, and update entries.

## Trust

Prefer concrete proof: GitHub repo, release ZIP, issue link, validation commands, and exact risk boundaries. Avoid revenue promises, fake testimonials, brand logos, and vague AI productivity language.

## Interaction

The email form must disclose that updates are only sent to subscribers. If backend environment variables are missing, the UI should show a configuration error rather than collecting emails.

