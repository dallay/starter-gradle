#!/bin/sh
set -e

echo "🚀 Pre-push check start"

# Check if pnpm is available (handles both interactive and non-interactive shells)
if command -v pnpm >/dev/null 2>&1 || /bin/sh -lc 'command -v pnpm' >/dev/null 2>&1; then
    echo "✅ pnpm found, running full check..."
    ./gradlew check
else
    echo "⚠️  WARNING: pnpm not found in PATH"
    echo "   Skipping documentation checks, running core validations only..."
    echo "   To enable full checks, ensure pnpm is available: corepack enable && corepack prepare pnpm@latest --activate"
    echo ""
    # Run check excluding docs tasks that require pnpm
    ./gradlew check -x :docs:pnpmInstall -x :docs:websiteCheck -x :docs:fileContentCheck
fi

if [ $? -eq 0 ]; then
    echo "✅ Pre-push check passed"
else
    echo "❌ Pre-push check failed"
    exit 1
fi
