---
description: How to manage database migrations with Payload CMS in Docker
---

# Database Migration Workflow

Since we have disabled `push: true` in `payload.config.ts` to prevent data loss, you must create migrations for every schema change (e.g., adding fields, creating collections).

## 1. Make Schema Changes
Modify your Payload collections or globals in `frontend/collections/` or `frontend/globals/`.

## 2. Create a Migration File
Run the following command to create an empty migration file:

```bash
docker compose -f docker-compose.dev.yml exec frontend npx payload migrate:create <descriptive_name>
```

Example: `... migrate:create add_phone_to_users`

## 3. Write the Migration SQL
1.  Locate the new file in `frontend/migrations/`.
2.  Open it and write the SQL for the `up` (apply) and `down` (revert) functions.
3.  **Tip**: You can use `CREATE TABLE IF NOT EXISTS` and `DO $$ ... EXCEPTION` blocks to make migrations idempotent and safe.

## 4. Run the Migration
Apply the changes to the database:

```bash
docker compose -f docker-compose.dev.yml exec frontend npx payload migrate
```

## 5. Restart the Application
Restart the frontend container to ensure Payload picks up the latest schema changes:

```bash
docker compose -f docker-compose.dev.yml restart frontend
```
