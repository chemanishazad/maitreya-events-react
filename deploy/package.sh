#!/usr/bin/env bash
# Bundles a completed `next build` (standalone output) into release.tgz for the server.
# Used by the Deploy workflow; can be run locally on Linux/macOS/Git Bash for testing.
set -euo pipefail

SHA="${1:-$(git rev-parse HEAD 2>/dev/null || echo local)}"
OUT="${2:-release.tgz}"
DIST="$(mktemp -d)"

[ -f .next/standalone/server.js ] || { echo "Run 'npm run build' first (output: standalone)." >&2; exit 1; }

cp -a .next/standalone/. "$DIST/"
# Secrets come from /opt/maitreya/<env>/shared/.env on the server — never ship local .env files
rm -f "$DIST"/.env*
mkdir -p "$DIST/.next"
cp -a .next/static "$DIST/.next/static"
[ -d public ] && cp -a public "$DIST/public"
mkdir -p "$DIST/deploy"
cp deploy/ecosystem.config.cjs "$DIST/deploy/"
echo "$SHA" > "$DIST/REVISION"
uname -m > "$DIST/ARCH"

tar -czf "$OUT" -C "$DIST" .
rm -rf "$DIST"
echo "Packaged $OUT ($(du -h "$OUT" | cut -f1)) for $(uname -m), revision ${SHA:0:7}"
