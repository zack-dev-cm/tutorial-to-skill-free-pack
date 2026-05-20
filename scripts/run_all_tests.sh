#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"$ROOT/scripts/validate_skill_artifact.py"

SKILLS_FILE="$(mktemp)"
python3 - <<'PY' "$ROOT/skill-pack-manifest.json" >"$SKILLS_FILE"
import json, sys
for skill in json.load(open(sys.argv[1]))["skills"]:
    print(skill["name"])
PY

while IFS= read -r skill; do
  "$ROOT/scripts/openclaw_smoke_test_skill.py" --skill "$skill"
done <"$SKILLS_FILE"

while IFS= read -r skill; do
  "$ROOT/scripts/openclaw_smoke_test_skill.py" --skill "$skill" --run-agent --timeout 180
done <"$SKILLS_FILE"

rm -f "$SKILLS_FILE"

python3 - <<'PY' "$ROOT/skill-pack-manifest.json" "$ROOT"
import json, subprocess, sys
manifest = json.load(open(sys.argv[1]))
root = sys.argv[2]
for skill in manifest["skills"]:
    subprocess.check_call(["python3", "-m", "json.tool", f"{root}/{skill['proof_card_json']}"], stdout=subprocess.DEVNULL)
    subprocess.check_call(["python3", "-m", "json.tool", f"{root}/proof-cards/{skill['name']}-openclaw-smoke.json"], stdout=subprocess.DEVNULL)
PY

echo "all tutorial-to-skill tests passed"
