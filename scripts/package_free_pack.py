#!/usr/bin/env python3
"""Create a distributable archive for the free tutorial-to-skill pack."""

from __future__ import annotations

import json
import shutil
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def main() -> int:
    manifest = json.loads((ROOT / "skill-pack-manifest.json").read_text(encoding="utf-8"))
    ts = time.strftime("%Y%m%dT%H%M%S")
    stem = f"tutorial-to-skill-free-pack-{ts}"
    staging = DIST / stem
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir(parents=True)

    for rel in (
        "README.md",
        "LICENSE",
        "skill-pack-manifest.json",
        "validation-against-clawpath-2026-05-20.md",
        "deployments/deployment-validation-2026-05-20.md",
    ):
        target = staging / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / rel, staging / rel)

    for folder in ("skills", "proof-cards", "scripts"):
        ignore = shutil.ignore_patterns("__pycache__", "*.pyc")
        shutil.copytree(ROOT / folder, staging / folder, ignore=ignore)

    metadata = {
        "name": manifest["name"],
        "date": manifest["date"],
        "skills": [skill["name"] for skill in manifest["skills"]],
        "decision": manifest["decision"],
        "packaged_at": ts,
        "install_hint": "Copy each folder under skills/ into ~/.openclaw/skills/ or run scripts/deploy_openclaw_pack.py from the unpacked pack.",
    }
    (staging / "PACK.json").write_text(json.dumps(metadata, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    archive = shutil.make_archive(str(staging), "zip", root_dir=DIST, base_dir=stem)
    latest = DIST / "tutorial-to-skill-free-pack-latest.zip"
    shutil.copy2(archive, latest)
    print(archive)
    print(latest)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
