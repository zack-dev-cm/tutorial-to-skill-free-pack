#!/usr/bin/env python3
"""Install a local proof skill into an isolated OpenClaw profile and smoke-test it."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "skill-pack-manifest.json"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--skill", default="ai-video-scene-director")
    parser.add_argument("--profile", default=None)
    parser.add_argument("--run-agent", action="store_true")
    parser.add_argument("--timeout", type=int, default=180)
    args = parser.parse_args()

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    skill = next((item for item in manifest["skills"] if item["name"] == args.skill), None)
    if not skill:
        print(f"unknown skill: {args.skill}", file=sys.stderr)
        return 2

    profile = args.profile or skill["openclaw_profile"]
    skill_dir = ROOT / skill["skill_dir"]
    if not skill_dir.exists():
        print(f"missing skill dir: {skill_dir}", file=sys.stderr)
        return 1

    pre = run_json(openclaw_cmd(profile, ["skills", "check", "--json"]))
    managed_dir = Path(pre["managedSkillsDir"])
    target_dir = managed_dir / skill["name"]
    managed_dir.mkdir(parents=True, exist_ok=True)
    if target_dir.exists():
        shutil.rmtree(target_dir)
    shutil.copytree(skill_dir, target_dir)

    info = run_json(openclaw_cmd(profile, ["skills", "info", skill["name"], "--json"]))
    failures: list[str] = []
    for key in ("eligible", "modelVisible", "commandVisible"):
        if info.get(key) is not True:
            failures.append(f"OpenClaw skill info {key} is not true")
    if info.get("missing") not in ({}, None):
        missing = info["missing"]
        if any(missing.get(key) for key in ("bins", "anyBins", "env", "config", "os")):
            failures.append(f"OpenClaw reports missing requirements: {missing}")

    agent_result = None
    if args.run_agent:
        agent_result = run_agent(profile, skill, args.timeout)
        text = extract_agent_text(agent_result)
        lower = text.lower()
        for section in skill["required_output_sections"]:
            if section.lower() not in lower:
                failures.append(f"runtime output missing section: {section}")
        first_nonempty = next((line.strip() for line in text.splitlines() if line.strip()), "")
        if first_nonempty.lower().startswith(("hey", "hi ", "hello")):
            failures.append("runtime output starts with a greeting/preamble")

    receipt = {
        "skill": skill["name"],
        "profile": profile,
        "timestamp": int(time.time()),
        "skill_info": {
            "filePath": public_path(info.get("filePath")),
            "eligible": info.get("eligible"),
            "modelVisible": info.get("modelVisible"),
            "commandVisible": info.get("commandVisible"),
            "missing": info.get("missing"),
        },
        "runtime": summarize_agent_result(agent_result) if agent_result else None,
        "passed": not failures,
        "failures": failures,
    }
    out = ROOT / "proof-cards" / f"{skill['name']}-openclaw-smoke.json"
    out.write_text(json.dumps(receipt, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}", file=sys.stderr)
        print(f"wrote {out}")
        return 1
    print(f"OpenClaw smoke test passed for {skill['name']}")
    print(f"wrote {out}")
    return 0


def run_json(cmd: list[str]) -> dict:
    proc = subprocess.run(cmd, cwd=ROOT, text=True, capture_output=True)
    if proc.returncode != 0:
        raise SystemExit(f"command failed: {' '.join(cmd)}\n{proc.stderr or proc.stdout}")
    try:
        return json.loads(proc.stdout)
    except json.JSONDecodeError as error:
        raise SystemExit(f"command did not return JSON: {' '.join(cmd)}\n{error}\n{proc.stdout[:1000]}")


def run_agent(profile: str, skill: dict, timeout: int) -> dict:
    session_id = f"{skill['name']}-smoke-{int(time.time())}"
    cmd = [
        *openclaw_cmd(profile, ["agent"]),
        "--agent",
        "main",
        "--session-id",
        session_id,
        "--message",
        skill["test_prompt"],
        "--json",
        "--timeout",
        str(timeout),
    ]
    return run_json(cmd)


def extract_agent_text(payload: dict) -> str:
    texts: list[str] = []
    for item in payload.get("payloads", []):
        if isinstance(item, dict) and isinstance(item.get("text"), str):
            texts.append(item["text"])
    return "\n".join(texts)


def summarize_agent_result(payload: dict | None) -> dict | None:
    if not payload:
        return None
    meta = payload.get("meta") or {}
    agent_meta = meta.get("agentMeta") or {}
    return {
        "transport": meta.get("transport"),
        "fallbackFrom": meta.get("fallbackFrom"),
        "provider": agent_meta.get("provider"),
        "model": agent_meta.get("model"),
        "durationMs": meta.get("durationMs"),
        "textChars": len(extract_agent_text(payload)),
    }


def public_path(value: object) -> object:
    if not isinstance(value, str):
        return value
    home = str(Path.home())
    if value.startswith(home + "/"):
        return "~" + value[len(home):]
    return value


def openclaw_cmd(profile: str | None, args: list[str]) -> list[str]:
    if not profile or profile == "default":
        return ["openclaw", *args]
    return ["openclaw", "--profile", profile, *args]


if __name__ == "__main__":
    raise SystemExit(main())
