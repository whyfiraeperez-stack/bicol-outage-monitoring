#!/usr/bin/env bash
# Usage: ./push.sh https://github.com/YOUR-USER/almasor-outage-monitoring.git
set -e
[ -z "$1" ] && { echo "Usage: ./push.sh <github-repo-url>"; exit 1; }
[ -d .git ] || git init -b main
git add -A
git commit -m "ALMASOR outage monitoring dashboard" || true
git remote remove origin 2>/dev/null || true
git remote add origin "$1"
git push -u origin main
