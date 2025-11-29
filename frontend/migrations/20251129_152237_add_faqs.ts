import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_faqs_category" AS ENUM('algemeen', 'inschrijvingen', 'kampen', 'verhuur', 'financieel');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "faqs" (
      "id" serial PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" jsonb NOT NULL,
      "category" "enum_faqs_category" DEFAULT 'algemeen',
      "order" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
    DROP TABLE "faqs" CASCADE;
    DROP TYPE "public"."enum_faqs_category";
  `)
}
