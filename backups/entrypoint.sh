#!/bin/bash
set -euo pipefail

if [[ "${1:-}" == "backup-now" ]]; then
  exec /usr/local/bin/backup.sh
fi

CRON_SPEC="${BACKUP_CRON:-0 3 * * *}"
echo "${CRON_SPEC} /usr/local/bin/backup.sh" > /etc/crontabs/root
echo "[backup] cron schedule: ${CRON_SPEC}"
exec crond -f -l 2
