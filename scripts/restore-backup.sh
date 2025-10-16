#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RESTORE_DIR="${ROOT_DIR}/backups/data/restore"
UNPACK_DIR="${RESTORE_DIR}/unpacked"
mkdir -p "${RESTORE_DIR}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: '$1' is required but not installed." >&2
    exit 1
  fi
}

require_cmd rclone
require_cmd docker
if ! docker compose version >/dev/null 2>&1; then
  echo "Error: docker compose plugin is required." >&2
  exit 1
fi

echo "Select environment to restore from:"
echo "  1) dev"
echo "  2) prod"
read -rp "Choice [1-2]: " choice

case "${choice}" in
  1)
    ENV_NAME="dev"
    ENV_FILE=".env"
    COMPOSE_FILE="docker-compose.dev.yml"
    REMOTE_VAR="RCLONE_REMOTE_DEV"
    ;;
  2)
    ENV_NAME="prod"
    ENV_FILE=".env.production"
    COMPOSE_FILE="docker-compose.prod.yml"
    REMOTE_VAR="RCLONE_REMOTE_PROD"
    ;;
  *)
    echo "Invalid choice." >&2
    exit 1
    ;;
esac

ENV_PATH="${ROOT_DIR}/${ENV_FILE}"
if [[ ! -f "${ENV_PATH}" ]]; then
  echo "Error: environment file '${ENV_FILE}' not found." >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
. "${ENV_PATH}"
set +a

REMOTE="${!REMOTE_VAR-}"
if [[ -z "${REMOTE}" ]]; then
  echo "Error: ${REMOTE_VAR} is not set in ${ENV_FILE}." >&2
  exit 1
fi

# Provide sensible defaults for MinIO credentials if missing in env file
MINIO_ENDPOINT="${MINIO_ENDPOINT:-http://minio:9000}"
MINIO_ACCESS_KEY="${MINIO_ACCESS_KEY:-${MINIO_ROOT_USER:-minioadmin}}"
MINIO_SECRET_KEY="${MINIO_SECRET_KEY:-${MINIO_ROOT_PASSWORD:-minioadmin123}}"
RESTORE_ROLE="${PG_RESTORE_ROLE:-${POSTGRES_USER:-postgres}}"
RESTORE_CLEAN="${PG_RESTORE_CLEAN:-false}"
RESTORE_DATA_ONLY="${PG_RESTORE_DATA_ONLY:-true}"
RESTORE_SCHEMAS_RAW="${PG_RESTORE_SCHEMAS:-public}"
RESTORE_RESET_SCHEMA="${PG_RESTORE_RESET_SCHEMA:-true}"

RESTORE_FLAGS=()
SCHEMA_LIST=()
if [[ "${RESTORE_DATA_ONLY}" == "true" && "${RESTORE_RESET_SCHEMA}" == "true" ]]; then
  echo "Warning: PG_RESTORE_DATA_ONLY=true and PG_RESTORE_RESET_SCHEMA=true; skipping schema reset." >&2
  RESTORE_RESET_SCHEMA="false"
fi
if [[ "${RESTORE_CLEAN}" == "true" ]]; then
  RESTORE_FLAGS+=("--clean" "--if-exists")
fi
if [[ "${RESTORE_DATA_ONLY}" == "true" ]]; then
  RESTORE_FLAGS+=("--data-only")
fi
if [[ -n "${RESTORE_SCHEMAS_RAW}" ]]; then
  IFS=',' read -ra SCHEMA_LIST <<< "${RESTORE_SCHEMAS_RAW}"
  for schema in "${SCHEMA_LIST[@]}"; do
    schema="$(echo "${schema}" | xargs)"
    [[ -z "${schema}" ]] && continue
    RESTORE_FLAGS+=("--schema=${schema}")
  done
fi
RESTORE_FLAGS_STR=""
if (( ${#RESTORE_FLAGS[@]} )); then
  printf -v RESTORE_FLAGS_STR ' %q' "${RESTORE_FLAGS[@]}"
fi

BACKUP_NAMES=()
BACKUP_LINES=()
while IFS= read -r line; do
  BACKUP_LINES+=("${line}")
done < <(rclone lsl "${REMOTE}")

if [[ ${#BACKUP_LINES[@]} -eq 0 ]]; then
  echo "No backups found in ${REMOTE}." >&2
  exit 1
fi

echo "Available backups on ${REMOTE}:"
index=1
for line in "${BACKUP_LINES[@]}"; do
  read -r size date time name <<<"${line}"
  if [[ -n "${name:-}" ]]; then
    BACKUP_NAMES+=("${name}")
    printf "  %2d) %s (size %s bytes, created %s %s)\n" "${index}" "${name}" "${size}" "${date}" "${time}"
    ((index++))
  fi
done

if [[ ${#BACKUP_NAMES[@]} -eq 0 ]]; then
  echo "No valid backup files found in ${REMOTE}." >&2
  exit 1
fi

read -rp "Select backup to restore [1-${#BACKUP_NAMES[@]}]: " selection
if ! [[ "${selection}" =~ ^[0-9]+$ ]] || (( selection < 1 || selection > ${#BACKUP_NAMES[@]} )); then
  echo "Invalid selection." >&2
  exit 1
fi

ARCHIVE_NAME="${BACKUP_NAMES[$((selection-1))]}"
ARCHIVE_PATH="${RESTORE_DIR}/${ARCHIVE_NAME}"

echo "Downloading ${ARCHIVE_NAME}..."
rclone copy "${REMOTE}/${ARCHIVE_NAME}" "${RESTORE_DIR}"

rm -rf "${UNPACK_DIR}"
mkdir -p "${UNPACK_DIR}"

echo "Unpacking archive..."
tar -xzf "${ARCHIVE_PATH}" -C "${UNPACK_DIR}"

DB_DUMP=""
if DB_DUMP=$(find "${UNPACK_DIR}/db" -maxdepth 1 -type f -name '*.dump' -print -quit 2>/dev/null); then
  :
else
  DB_DUMP=""
fi

MINIO_DIR=""
if [[ -d "${UNPACK_DIR}/minio" ]]; then
  if find "${UNPACK_DIR}/minio" -mindepth 1 -maxdepth 1 -type d | grep -q .; then
    MINIO_DIR="${UNPACK_DIR}/minio"
  fi
fi

if [[ -n "${DB_DUMP}" ]]; then
  read -rp "Restore database from $(basename "${DB_DUMP}")? [y/N]: " restore_db
  if [[ "${restore_db}" =~ ^[Yy]$ ]]; then
    if [[ "${RESTORE_RESET_SCHEMA}" == "true" && ${#SCHEMA_LIST[@]} -gt 0 ]]; then
      echo "Resetting schemas before restore..."
      for schema in "${SCHEMA_LIST[@]}"; do
        schema="$(echo "${schema}" | xargs)"
        [[ -z "${schema}" ]] && continue
        docker compose -f "${ROOT_DIR}/${COMPOSE_FILE}" exec -T db \
          psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB}" \
          -v ON_ERROR_STOP=1 \
          -c "DROP SCHEMA IF EXISTS \"${schema}\" CASCADE;" \
          -c "CREATE SCHEMA \"${schema}\" AUTHORIZATION \"${POSTGRES_USER:-postgres}\";" \
          -c "GRANT ALL ON SCHEMA \"${schema}\" TO \"${POSTGRES_USER:-postgres}\";" \
          -c "GRANT ALL ON SCHEMA \"${schema}\" TO PUBLIC;"
      done
    fi

    DB_DIR="$(dirname "${DB_DUMP}")"
    DB_FILE="$(basename "${DB_DUMP}")"
    echo "Restoring database ${POSTGRES_DB:-postgres} using backup container..."
    docker compose -f "${ROOT_DIR}/${COMPOSE_FILE}" run --rm -T \
      --volume "${DB_DIR}:/restore-db:ro" \
      --entrypoint bash \
      backup \
      -lc "set -euo pipefail; \
        export PGPASSWORD=\"${POSTGRES_PASSWORD}\"; \
        pg_restore${RESTORE_FLAGS_STR} \
          --no-owner \
          --no-privileges \
          --role=\"${RESTORE_ROLE}\" \
          --host \"${POSTGRES_HOST:-db}\" \
          --port \"${POSTGRES_PORT:-5432}\" \
          --username \"${POSTGRES_USER:-postgres}\" \
          --dbname \"${POSTGRES_DB:-postgres}\" \
          /restore-db/${DB_FILE}"
    echo "Database restore complete."
  fi
else
  echo "No database dump found in archive."
fi

if [[ -n "${MINIO_DIR}" ]]; then
  read -rp "Restore MinIO buckets from archive? [y/N]: " restore_minio
  if [[ "${restore_minio}" =~ ^[Yy]$ ]]; then
    echo "Restoring MinIO buckets..."
    docker compose -f "${ROOT_DIR}/${COMPOSE_FILE}" run --rm -T \
      --volume "${MINIO_DIR}:/restore:ro" \
      --entrypoint /bin/sh \
      backup \
      -c 'set -euo pipefail
        if ! command -v mc >/dev/null 2>&1; then
          echo "mc not available" >&2
          exit 1
        fi
        mc alias set restore "$MINIO_ENDPOINT" "$MINIO_ACCESS_KEY" "$MINIO_SECRET_KEY"
        for dir in /restore/*; do
          [ -d "$dir" ] || continue
          bucket="$(basename "$dir")"
          echo "  -> $bucket"
          mc mb restore/"$bucket" --ignore-existing >/dev/null 2>&1 || true
          mc mirror --overwrite "$dir" restore/"$bucket"
          if [ "$bucket" = "media-cdn" ]; then
            mc anonymous set public restore/"$bucket" >/dev/null 2>&1 || true
          fi
        done'
    echo "MinIO restore complete."
  fi
fi

echo "Restore artifacts kept in ${UNPACK_DIR}. Delete manually when done."
