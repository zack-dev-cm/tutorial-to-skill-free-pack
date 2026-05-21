# ClawHub Publication Receipt - 2026-05-21

## Published Skills

- `ai-video-scene-director@0.1.0`
  - Owner: `zack-dev-cm`
  - Publish id: `k97d61pza849w9mhpeyknz7rkd874jkn`
  - Tag: `latest=0.1.0`
- `affiliate-ugc-test-planner@0.1.0`
  - Owner: `zack-dev-cm`
  - Publish id: `k9779gdzmg2jz0nst10fpv8m45874qhn`
  - Tag: `latest=0.1.0`

## Registry Verification

Commands run after publishing:

```bash
clawhub inspect ai-video-scene-director
clawhub inspect affiliate-ugc-test-planner
clawhub search "ai video scene director"
clawhub search "affiliate ugc test planner"
```

Both skills resolved by direct inspect and appeared in search results.

## Fresh Install Verification

Installed both skills from ClawHub into a clean temporary workspace:

```bash
clawhub --workdir "$tmp" --dir skills install ai-video-scene-director
clawhub --workdir "$tmp" --dir skills install affiliate-ugc-test-planner
```

The install produced:

- `.clawhub/lock.json`
- `skills/ai-video-scene-director/SKILL.md`
- `skills/ai-video-scene-director/references/source-evidence.md`
- `skills/affiliate-ugc-test-planner/SKILL.md`
- `skills/affiliate-ugc-test-planner/references/source-evidence.md`

## User Install Path

```bash
openclaw skills install ai-video-scene-director
openclaw skills install affiliate-ugc-test-planner
openclaw skills info
```

The GitHub release ZIP and manual copy path remain available as fallback distribution.
