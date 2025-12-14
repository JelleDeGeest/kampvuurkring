import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "search_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"query" varchar NOT NULL,
  	"timestamp" timestamp(3) with time zone NOT NULL,
  	"results_count" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "activiteiten" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "_activiteiten_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "weekends" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "_weekends_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "camps" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "_camps_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! U ontvangt een bevestiging per e-mail of kunt deze downloaden via de onderstaande knop.';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "search_logs_id" integer;
  CREATE INDEX IF NOT EXISTS "search_logs_updated_at_idx" ON "search_logs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "search_logs_created_at_idx" ON "search_logs" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_logs_fk" FOREIGN KEY ("search_logs_id") REFERENCES "public"."search_logs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_search_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("search_logs_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search_logs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "search_logs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_search_logs_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_search_logs_id_idx";
  ALTER TABLE "activiteiten" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "_activiteiten_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "weekends" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "_weekends_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "camps" ALTER COLUMN "enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "_camps_v" ALTER COLUMN "version_enrollment_settings_custom_message" SET DEFAULT 'Bedankt voor je inschrijving! We nemen zo snel mogelijk contact met je op.';
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "search_logs_id";`)
}
