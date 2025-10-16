#!/usr/bin/env bash

set -euo pipefail

# Resolve repo root from script location
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Allow overriding compose file / service via env vars when needed
COMPOSE_FILE_REL="${COMPOSE_FILE:-docker-compose.dev.yml}"
SERVICE="${SERVICE:-db}"
DATA_DIR_REL="supabase/volumes/db/data"

COMPOSE_FILE="${REPO_ROOT}/${COMPOSE_FILE_REL}"
DATA_DIR="${REPO_ROOT}/${DATA_DIR_REL}"

if [[ ! -f "${COMPOSE_FILE}" ]]; then
  echo "Compose file not found: ${COMPOSE_FILE}" >&2
  exit 1
fi

# Detect docker compose (plugin vs standalone)
if command -v docker &>/dev/null && docker compose version &>/dev/null; then
  COMPOSE_CMD=(docker compose)
elif command -v docker-compose &>/dev/null; then
  COMPOSE_CMD=(docker-compose)
else
  echo "docker compose is required but not available" >&2
  exit 1
fi

echo "Stopping ${SERVICE} service..."
"${COMPOSE_CMD[@]}" -f "${COMPOSE_FILE}" stop "${SERVICE}" >/dev/null || true

echo "Removing existing database files under ${DATA_DIR_REL}..."
rm -rf "${DATA_DIR}"
mkdir -p "${DATA_DIR}"

echo "Clearing MinIO buckets..."
docker exec minio-dev sh -c "rm -rf /data/media-original/* /data/media-cdn/*" 2>/dev/null || echo "MinIO buckets already empty or not found"

echo "Starting ${SERVICE} service..."
"${COMPOSE_CMD[@]}" -f "${COMPOSE_FILE}" up -d "${SERVICE}"

echo "Waiting for database to be ready..."
sleep 3

echo "Restarting frontend to recreate schema..."
"${COMPOSE_CMD[@]}" -f "${COMPOSE_FILE}" restart frontend

echo "${SERVICE} reset complete, MinIO buckets cleared, and frontend restarted."
