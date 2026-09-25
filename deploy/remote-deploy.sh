#!/usr/bin/env bash
# Runs ON THE SERVER, invoked by the GitHub "Deploy" workflow over SSH.
#   usage: remote-deploy.sh <git-sha> <release.tgz> [env-file]
#
# Atomic release: unpack into /opt/maitreya/releases/<timestamp>-<sha>, flip the `current`
# symlink, reload PM2, health-check, and roll back to the previous release on failure.
set -euo pipefail

SHA="${1:?sha required}"
TARBALL="${2:?tarball required}"
ENV_UPLOAD="${3:-}"

BASE="${MAITREYA_ROOT:-/opt/maitreya}"
APP="maitreya-events"
KEEP_RELEASES=5
RELEASE="$BASE/releases/$(date +%Y%m%d%H%M%S)-${SHA:0:7}"

log() { printf '\033[1;33m[deploy]\033[0m %s\n' "$*"; }

command -v pm2 >/dev/null || { echo "pm2 not found on PATH" >&2; exit 1; }

# First deploy: create the directory layout
if [ ! -d "$BASE/releases" ]; then
  log "Creating $BASE"
  sudo mkdir -p "$BASE"
  sudo chown "$(id -un)":"$(id -gn)" "$BASE"
  mkdir -p "$BASE/releases" "$BASE/shared" "$BASE/logs"
fi

# Runtime env: replace with the uploaded ENV_FILE secret — an empty secret leaves the server copy untouched
if [ -n "$ENV_UPLOAD" ] && grep -q '[^[:space:]]' "$ENV_UPLOAD" 2>/dev/null; then
  install -m 600 "$ENV_UPLOAD" "$BASE/shared/.env"
  log "Updated shared/.env"
fi
rm -f "$ENV_UPLOAD"
[ -f "$BASE/shared/.env" ] || install -m 600 /dev/null "$BASE/shared/.env"

# App port: PORT=… in the env file, default 3100 (must match nginx proxy_pass)
PORT="$(grep -E '^[[:space:]]*PORT[[:space:]]*=' "$BASE/shared/.env" | tail -n1 | sed -E 's/.*=[[:space:]]*"?([0-9]+)"?.*/\1/' || true)"
PORT="${PORT:-3100}"

log "Unpacking ${SHA:0:7} → $RELEASE"
mkdir -p "$RELEASE"
tar -xzf "$TARBALL" -C "$RELEASE"
rm -f "$TARBALL"

# The bundle contains platform-specific binaries (e.g. sharp) — refuse a mismatched build
BUILD_ARCH="$(cat "$RELEASE/ARCH" 2>/dev/null || echo unknown)"
if [ "$BUILD_ARCH" != "$(uname -m)" ]; then
  echo "Architecture mismatch: built on $BUILD_ARCH, server is $(uname -m). Set the BUILD_RUNNER repo variable." >&2
  rm -rf "$RELEASE"
  exit 1
fi

PREVIOUS="$(readlink -f "$BASE/current" 2>/dev/null || true)"

switch_to() {
  ln -sfn "$1" "$BASE/current.next"
  mv -Tf "$BASE/current.next" "$BASE/current"
  cp "$1/deploy/ecosystem.config.cjs" "$BASE/ecosystem.config.cjs"
  pm2 startOrReload "$BASE/ecosystem.config.cjs" --only "$APP" --update-env
}

healthy() {
  for _ in $(seq 1 30); do
    curl -fsS --max-time 3 "http://127.0.0.1:$PORT/api/health" | grep -q '"ok":true' && return 0
    sleep 1
  done
  return 1
}

log "Switching to $(basename "$RELEASE")"
switch_to "$RELEASE"

if healthy; then
  log "Health check passed"
else
  log "Health check FAILED — recent errors:"
  tail -n 30 "$BASE/logs/error.log" 2>/dev/null || true
  if [ -n "$PREVIOUS" ] && [ -d "$PREVIOUS" ] && [ "$PREVIOUS" != "$RELEASE" ]; then
    log "Rolling back to $(basename "$PREVIOUS")"
    switch_to "$PREVIOUS"
    healthy && log "Rollback healthy" || log "Rollback also unhealthy — check: pm2 logs $APP"
  fi
  rm -rf "$RELEASE"
  exit 1
fi

# Persist the process list so the app comes back after a server reboot
pm2 save >/dev/null

log "Pruning old releases (keeping $KEEP_RELEASES)"
ls -1dt "$BASE"/releases/*/ 2>/dev/null | tail -n +$((KEEP_RELEASES + 1)) | while read -r old; do
  [ "$(readlink -f "$old")" = "$(readlink -f "$BASE/current")" ] || rm -rf "$old"
done

log "Deployed ${SHA:0:7} ✔"
