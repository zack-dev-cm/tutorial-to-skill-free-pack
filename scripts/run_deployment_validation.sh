#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROFILE="${1:-default}"
RUN_RUNTIME="${RUN_RUNTIME:-1}"
if [[ "${2:-}" == "--skip-runtime" ]]; then
  RUN_RUNTIME="0"
fi

"$ROOT/scripts/validate_skill_artifact.py"
"$ROOT/scripts/deploy_openclaw_pack.py" --profile "$PROFILE"

python3 - <<'PY' "$ROOT/skill-pack-manifest.json" "$ROOT" "$PROFILE"
import json, subprocess, sys
manifest_path, root, profile = sys.argv[1:]
manifest = json.load(open(manifest_path))
for skill in manifest["skills"]:
    cmd = ["openclaw"]
    if profile != "default":
        cmd += ["--profile", profile]
    cmd += ["skills", "info", skill["name"], "--json"]
    info = json.loads(subprocess.check_output(cmd, text=True))
    for key in ("eligible", "modelVisible", "commandVisible"):
        if info.get(key) is not True:
            raise SystemExit(f"{skill['name']}: {key} is not true")
PY

if [[ "$RUN_RUNTIME" == "1" ]]; then
python3 - <<'PY' "$ROOT/skill-pack-manifest.json" "$ROOT" "$PROFILE"
import json, subprocess, sys
manifest_path, root, profile = sys.argv[1:]
manifest = json.load(open(manifest_path))
for skill in manifest["skills"]:
    cmd = [f"{root}/scripts/openclaw_smoke_test_skill.py", "--skill", skill["name"], "--profile", profile, "--run-agent", "--timeout", "180"]
    subprocess.check_call(cmd)
PY
else
  echo "runtime smoke skipped for profile $PROFILE"
fi

"$ROOT/scripts/package_free_pack.py"

echo "deployment validation passed for profile $PROFILE"
