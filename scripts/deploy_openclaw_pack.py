#!/usr/bin/env python3
"""Deploy manifest skills into an OpenClaw managed skills directory."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "skill-pack-manifest.json"
DEPLOYMENTS = ROOT / "deployments"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", default="default", help="OpenClaw profile name; use default for the normal profile")
    parser.add_argument("--no-backup", action="store_true")
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    check = run_json(openclaw_cmd(args.profile, ["skills", "check", "--json"]))
    managed_dir = Path(check["managedSkillsDir"])
    managed_dir.mkdir(parents=True, exist_ok=True)

    ts = time.strftime("%Y%m%dT%H%M%S")
    receipt = {
        "timestamp": ts,
        "profile": args.profile,
        "managedSkillsDir": str(managed_dir),
        "manifest": str(MANIFEST),
        "skills": [],
    }

    for skill in manifest["skills"]:
        name = skill["name"]
        source = ROOT / skill["skill_dir"]
        target = managed_dir / name
        backup = None
        if target.exists():
            if args.no_backup:
                shutil.rmtree(target)
            else:
                backup = DEPLOYMENTS / "backups" / args.profile / f"{name}-{ts}"
                backup.parent.mkdir(parents=True, exist_ok=True)
                if backup.exists():
                    shutil.rmtree(backup)
                shutil.copytree(target, backup)
                shutil.rmtree(target)
        shutil.copytree(source, target)

        info = run_json(openclaw_cmd(args.profile, ["skills", "info", name, "--json"]))
        receipt["skills"].append(
            {
                "name": name,
                "source": str(source),
                "target": str(target),
                "backup": str(backup) if backup else None,
                "eligible": info.get("eligible"),
                "modelVisible": info.get("modelVisible"),
                "commandVisible": info.get("commandVisible"),
                "missing": info.get("missing"),
            }
        )

    DEPLOYMENTS.mkdir(exist_ok=True)
    out = DEPLOYMENTS / f"openclaw-{args.profile}-deployment-{ts}.json"
    latest = DEPLOYMENTS / f"openclaw-{args.profile}-deployment-latest.json"
    out.write_text(json.dumps(receipt, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    latest.write_text(json.dumps(receipt, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"deployed {len(receipt['skills'])} skills to OpenClaw profile {args.profile}")
    print(f"wrote {out}")
    return 0


def run_json(cmd: list[str]) -> dict:
    proc = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    if proc.returncode != 0:
        raise SystemExit(f"command failed: {' '.join(cmd)}\n{proc.stderr or proc.stdout}")
    text = proc.stdout.strip()
    start = text.find("{")
    if start > 0:
        text = text[start:]
    return json.loads(text)


def openclaw_cmd(profile: str | None, args: list[str]) -> list[str]:
    if not profile or profile == "default":
        return ["openclaw", *args]
    return ["openclaw", "--profile", profile, *args]


if __name__ == "__main__":
    raise SystemExit(main())

