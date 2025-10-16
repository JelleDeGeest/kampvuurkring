#!/bin/bash
set -euo pipefail

log() {
  printf '[%s] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"
}

ROOT_DIR="${BACKUP_DIR:-/backups}"
STAMP="$(date -u +%Y%m%d_%H%M%S)"
WORK_DIR="${ROOT_DIR}/work/${STAMP}"
ARCHIVE_NAME="${PROJECT_NAME:-backup}_${STAMP}.tar.gz"
ARCHIVE_PATH="${ROOT_DIR}/${ARCHIVE_NAME}"
RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"

mkdir -p "${WORK_DIR}"
trap 'rm -rf "${WORK_DIR}"' EXIT

umask 077

backup_db() {
  if [[ "${ENABLE_DB_BACKUP:-true}" != "true" ]]; then
    log "Skipping database backup"
    return
  fi

  if [[ -z "${PGPASSWORD:-}" ]]; then
    log "PGPASSWORD is required for database backup"
    exit 1
  fi

  mkdir -p "${WORK_DIR}/db"
  log "Dumping database ${PGDATABASE:-postgres}"
  pg_dump \
    --host "${PGHOST:-db}" \
    --port "${PGPORT:-5432}" \
    --username "${PGUSER:-postgres}" \
    --format=custom \
    "${PGDATABASE:-postgres}" \
    > "${WORK_DIR}/db/${PGDATABASE:-postgres}_${STAMP}.dump"
}

backup_minio() {
  if [[ "${ENABLE_MINIO_BACKUP:-true}" != "true" ]]; then
    log "Skipping MinIO backup"
    return
  fi

  if [[ -z "${MINIO_ENDPOINT:-}" || -z "${MINIO_ACCESS_KEY:-}" || -z "${MINIO_SECRET_KEY:-}" ]]; then
    log "MinIO endpoint and credentials are required"
    exit 1
  fi

  if [[ -z "${MINIO_BUCKETS:-}" ]]; then
    log "MINIO_BUCKETS is empty, skipping MinIO sync"
    return
  fi

  mkdir -p "${WORK_DIR}/minio"
  mc alias set backup "${MINIO_ENDPOINT}" "${MINIO_ACCESS_KEY}" "${MINIO_SECRET_KEY}" >/dev/null

  IFS=',' read -ra BUCKET_LIST <<< "${MINIO_BUCKETS}"
  for bucket in "${BUCKET_LIST[@]}"; do
    bucket="$(echo "${bucket}" | xargs)"
    if [[ -z "${bucket}" ]]; then
      continue
    fi
    DEST="${WORK_DIR}/minio/${bucket}"
    if ! mc ls backup/"${bucket}" >/dev/null 2>&1; then
      log "Bucket ${bucket} not found; skipping"
      continue
    fi
    mkdir -p "${DEST}"
    log "Syncing MinIO bucket ${bucket}"
    mc mirror --overwrite backup/"${bucket}" "${DEST}"
  done
}

package_backup() {
  if [[ -z "$(ls -A "${WORK_DIR}")" ]]; then
    log "Nothing to archive"
    return 1
  fi

  mkdir -p "${ROOT_DIR}"
  tar -C "${WORK_DIR}" -czf "${ARCHIVE_PATH}" .
  log "Created archive ${ARCHIVE_PATH}"
}

upload_archive() {
  if [[ -z "${RCLONE_REMOTE:-}" ]]; then
    log "RCLONE_REMOTE not set; skipping upload"
    return
  fi

  DEFAULT_RCLONE_CONFIG="/config/rclone/rclone.conf"
  if [[ -z "${RCLONE_CONFIG:-}" && -f "${DEFAULT_RCLONE_CONFIG}" ]]; then
    export RCLONE_CONFIG="${DEFAULT_RCLONE_CONFIG}"
  fi

  if [[ -n "${RCLONE_CONFIG:-}" && ! -f "${RCLONE_CONFIG}" ]]; then
    log "Rclone config ${RCLONE_CONFIG} not found"
    exit 1
  fi

  log "Uploading archive to ${RCLONE_REMOTE}"
  rclone copy "${ARCHIVE_PATH}" "${RCLONE_REMOTE}" --log-level INFO
}

prune_archives() {
  log "Pruning archives older than ${RETENTION_DAYS} days"
  find "${ROOT_DIR}" -maxdepth 1 -name '*.tar.gz' -mtime +"${RETENTION_DAYS}" -print -delete
}

backup_db
backup_minio
if package_backup; then
  upload_archive
  prune_archives
else
  log "No backup content created; skipping upload"
fi
