#!/usr/bin/env python3
"""Validate tutorial-to-skill proof artifacts from the manifest."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "skill-pack-manifest.json"


def main() -> int:
    failures: list[str] = []

    if not MANIFEST.exists():
        failures.append(f"missing {MANIFEST.relative_to(ROOT)}")

    manifest = None
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"manifest JSON invalid: {error}")
        else:
            if manifest.get("decision") != "free-mvp-only":
                failures.append("manifest decision must be free-mvp-only")
            if not manifest.get("skills"):
                failures.append("manifest must include at least one skill")
            for skill in manifest.get("skills", []):
                for key in (
                    "name",
                    "source_url",
                    "skill_file",
                    "evidence_reference",
                    "proof_card_md",
                    "proof_card_json",
                    "runtime_receipt",
                    "test_prompt",
                ):
                    if not skill.get(key):
                        failures.append(f"manifest skill missing {key}")
                for key in ("skill_file", "evidence_reference", "proof_card_md", "proof_card_json", "runtime_receipt"):
                    rel = skill.get(key)
                    if rel and not (ROOT / rel).exists():
                        failures.append(f"manifest path missing: {rel}")
                validate_skill_entry(skill, failures)

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}", file=sys.stderr)
        return 1

    print("skill artifact validation passed")
    return 0


def validate_skill_entry(skill: dict, failures: list[str]) -> None:
    name = skill.get("name") or "<missing>"
    skill_file = ROOT / skill.get("skill_file", "")
    proof_json = ROOT / skill.get("proof_card_json", "")

    if skill_file.exists():
        text = skill_file.read_text(encoding="utf-8")
        frontmatter = parse_frontmatter(text)
        if frontmatter is None:
            failures.append(f"{name}: SKILL.md missing YAML frontmatter")
        else:
            if frontmatter.get("name") != name:
                failures.append(f"{name}: frontmatter name does not match manifest")
            if not frontmatter.get("description"):
                failures.append(f"{name}: SKILL.md missing description")
            if frontmatter.get("metadata") and "\n" in frontmatter["metadata"].strip():
                failures.append(f"{name}: metadata must remain single-line for OpenClaw compatibility")
            if frontmatter.get("metadata"):
                try:
                    json.loads(frontmatter["metadata"])
                except json.JSONDecodeError as error:
                    failures.append(f"{name}: metadata is not valid JSON: {error}")

        for section in skill.get("required_output_sections", []):
            if section.lower() not in text.lower():
                failures.append(f"{name}: SKILL.md missing output section term: {section}")

        required_safety = [
            "Do not copy",
            "Do not claim",
            "disclosure",
        ]
        for term in required_safety:
            if term.lower() not in text.lower():
                failures.append(f"{name}: SKILL.md missing safety term: {term}")

        banned_terms = [
            "OnlyFans",
            "private adult",
            "deepfake bypass",
            "guaranteed viral",
            "guaranteed income",
            "hide disclosure",
        ]
        for term in banned_terms:
            if term.lower() in text.lower():
                failures.append(f"{name}: SKILL.md contains banned term: {term}")

    if proof_json.exists():
        try:
            payload = json.loads(proof_json.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            failures.append(f"{name}: proof JSON invalid: {error}")
        else:
            if payload.get("decision") != "ship-free-proof-only":
                failures.append(f"{name}: proof JSON decision must be ship-free-proof-only")
            gates = payload.get("gates") or {}
            if gates.get("paid_ready") is not False:
                failures.append(f"{name}: paid_ready must be false")
            if gates.get("copied_prompt_redistribution") is not False:
                failures.append(f"{name}: copied_prompt_redistribution must be false")
            if gates.get("unsafe_workflow_support") is not False:
                failures.append(f"{name}: unsafe_workflow_support must be false")


def parse_frontmatter(text: str) -> dict[str, str] | None:
    if not text.startswith("---\n"):
        return None
    end = text.find("\n---\n", 4)
    if end == -1:
        return None
    block = text[4:end]
    parsed: dict[str, str] = {}
    current_key: str | None = None
    for line in block.splitlines():
        if re.match(r"^[A-Za-z0-9_-]+:", line):
            key, value = line.split(":", 1)
            current_key = key.strip()
            parsed[current_key] = value.strip()
        elif current_key:
            parsed[current_key] += "\n" + line
    return parsed


if __name__ == "__main__":
    raise SystemExit(main())
