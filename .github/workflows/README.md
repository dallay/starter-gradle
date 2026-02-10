## GitHub Actions

This folder contains workflows for CI, security scanning, publishing, and repository automation.

### Workflows

- **PR Checks**: runs Gradle `check` for pushes and pull requests.
- **PR Checks Build Logic**: runs build-logic checks when build-logic files change.
- **CodeQL Scan**: security scanning for Actions and Java/Kotlin.
- **Auto Fix Lockfile**: scheduled lockfile updates via PR.
- **Fix Renovate**: comment-triggered lockfile fixes for Renovate PRs.
- **Issue Labeled**: label-driven auto comments/closures for issues.
- **Close Issue**: closes inactive issues after 7 days.
- **Sync GitHub Labels**: syncs labels from `.github/config/labels.yml`.
- **Publish Release**: publishes tagged releases via `_publish`.
- **Publish Snapshot**: scheduled or manual snapshot publishing via `_publish`.

### Notes

- Action references are pinned by commit SHA.
- Publishing is restricted to `dallay/starter-gradle`.
