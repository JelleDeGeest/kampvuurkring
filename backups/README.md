# Backup Service

This directory holds the assets used by the backup container that ships database dumps and MinIO bucket snapshots to Google Drive via rclone.

## Rclone configuration

1. Run `rclone config` on your host and create a remote (for example `gdrive`).
2. Copy the resulting `rclone.conf` into `backups/rclone/`. The file is ignored by git.
3. If your remote uses a service account JSON, place it in the same directory.

## Manual backup run

Use the same compose file that is currently active:

```
docker compose -f docker-compose.dev.yml run --rm backup backup-now
```

## Restoring a backup

Launch the helper script and follow the prompts to choose dev/prod and a specific archive:

```
./scripts/restore-backup.sh
```

The script downloads the archive from Google Drive, restores the Postgres dump, and replays MinIO buckets if you opt in.

### Restore behaviour knobs
- `PG_RESTORE_SCHEMAS` (default `public`) controls which schemas are restored.
- `PG_RESTORE_RESET_SCHEMA` drops/recreates the listed schemas before restore (enabled by default).
- `PG_RESTORE_DATA_ONLY` and `PG_RESTORE_CLEAN` let you switch between data-only loads and full schema rebuilds.

The cron schedule inside the container is controlled with environment variables (`BACKUP_CRON_*`).
