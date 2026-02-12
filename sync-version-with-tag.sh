#!/bin/bash
# sync-version-with-tag.sh
# Update the version in gradle.properties to match the latest Git tag (vX.Y.Z)

set -euo pipefail

# Get the globally latest semantic version tag matching vX.Y.Z
tag=$(git tag --sort=-v:refname | grep -Em1 '^v[0-9]+\.[0-9]+\.[0-9]+$' || true)
if [[ -z "$tag" ]]; then
  echo "ERROR: No tag matching vX.Y.Z was found."
  exit 1
fi

version="${tag#v}"
echo "Syncing VERSION in gradle.properties to: $version"

prop_file="gradle.properties"
if [[ ! -f $prop_file ]]; then
  echo "ERROR: $prop_file not found"
  exit 1
fi

# Update the VERSION= line or append if missing
if grep -q '^VERSION=' "$prop_file"; then
  sed -i.bak -E "s/^VERSION=.*/VERSION=$version/" "$prop_file"
  rm -f "$prop_file.bak"
else
  echo "VERSION=$version" >> "$prop_file"
fi

echo "OK: gradle.properties updated to VERSION=$version"

# Helpful next-steps message
cat <<EOF
Next steps (recommended):
  1) Review the change: git diff $prop_file
  2) Commit the change: git add $prop_file && git commit -m "chore: sync version to $version"
  3) Push your branch and tag as appropriate. Note: if you created the tag before committing this change, update the tag to point to the commit you want (git tag -f v$version) and push with --force if necessary.
EOF
