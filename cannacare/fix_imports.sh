#!/usr/bin/env bash
set -euo pipefail

OLD="github.com/seuusuario/cannacare"
NEW="GitHubAlves150/cannacare-app/cannacare"

find . -name "*.go" -type f -print0 | while IFS= read -r -d '' file; do
  sed -i "s|${OLD}|${NEW}|g" "$file"
done

gofmt -w $(find . -name "*.go" -type f)
