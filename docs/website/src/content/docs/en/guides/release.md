---
title: Release Process
---

This guide explains how to publish releases and snapshots to Maven Central using GitHub Actions.

## Prerequisites

Before you can publish, ensure you have:

1. **GPG Key configured**: Follow the [GPG Setup Guide](../gpg-setup/) to create and configure your signing key
2. **Maven Central access**: Repository secrets configured:
   - `SIGNING_IN_MEMORY_KEY`: Your GPG private key
   - `SIGNING_IN_MEMORY_KEY_PASSWORD`: GPG key passphrase
   - `MAVEN_CENTRAL_USERNAME`: Maven Central username
   - `MAVEN_CENTRAL_PASSWORD`: Maven Central password
3. **Write permissions**: You must be a maintainer of the repository

## Understanding the Branch Model

This project uses a two-branch model for releases:

- **`main`**: Stable releases. Bug fixes and non-breaking changes land here
- **`minor`**: Next minor version development. Features land here

See [MAINTENANCE.md](https://github.com/dallay/starter-gradle/blob/main/.github/MAINTENANCE.md) for the complete workflow.

## Publishing a Release

### Step 1: Ensure all changes are merged

Make sure all changes you want to release are in the correct branch:
- **Patch release**: Changes should be in `main`
- **Minor release**: Changes should be in `minor`

### Step 2: Update the version

Update the version in the appropriate places:

```kotlin
// build.gradle.kts or gradle.properties
version = "1.2.3"  // For patch releases
version = "1.3.0"  // For minor releases
```

### Step 3: Create and push a tag

```bash
# Checkout the appropriate branch
git checkout main  # or git checkout minor

# Pull latest changes
git pull origin main

# Create an annotated tag
git tag -a v1.2.3 -m "Release version 1.2.3"

# Push the tag (this triggers the release workflow)
git push origin v1.2.3
```

**Important**: The tag must match the pattern `v[0-9]+.[0-9]+.[0-9]+` (e.g., `v1.2.3`)

### Step 4: Monitor the workflow

1. Go to **Actions** tab in GitHub
2. Click on the **Publish Release** workflow
3. Wait for completion (usually 5-10 minutes)

The workflow will:
- Build the project
- Generate a changelog from conventional commits
- Publish to Maven Central
- Create a GitHub release with the changelog

## Publishing a Snapshot

Snapshots are published automatically daily, but you can also trigger them manually:

### Automatic (Daily)

The `publish-snapshot.yml` workflow runs daily at 02:12 UTC.

### Manual

1. Go to **Actions** tab → **Publish Snapshot**
2. Click **Run workflow**
3. Select the branch (usually `main` or `minor`)
4. Click **Run workflow**

Snapshots use the version defined in your build files with a `-SNAPSHOT` suffix.

## Troubleshooting

### Release workflow failed

1. Check the workflow logs in GitHub Actions
2. Common issues:
   - **Signing failed**: Check GPG secrets are correctly configured
   - **Maven Central auth failed**: Verify credentials haven't expired
   - **Build failed**: Ensure all tests pass locally with `./gradlew check`

### Version already exists

Maven Central doesn't allow overwriting releases. If you need to fix something:
1. Use a new patch version (e.g., `v1.2.4` instead of `v1.2.3`)
2. Never delete and recreate tags with the same version

### Snapshot not updating

Snapshots can be cached by Maven/Gradle. Force an update:
```bash
./gradlew build --refresh-dependencies
```

## Release Checklist

Use this checklist before publishing:

- [ ] All tests pass locally (`./gradlew check`)
- [ ] Version is updated in build files
- [ ] CHANGELOG.md is updated (if maintained manually)
- [ ] GPG key is valid and not expired
- [ ] Maven Central credentials are current
- [ ] Tag follows the `vX.Y.Z` format
- [ ] Working on the correct branch (`main` for patches, `minor` for features)

## See Also

- [GPG Setup Guide](../gpg-setup/)
- [GitHub Workflows](https://github.com/dallay/starter-gradle/blob/main/.github/workflows/README.md)
- [Contributing Guide](https://github.com/dallay/starter-gradle/blob/main/.github/CONTRIBUTING.md)
