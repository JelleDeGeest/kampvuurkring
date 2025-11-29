import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create FAQ Page Global Table
    CREATE TABLE IF NOT EXISTS "faq_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar DEFAULT 'Veelgestelde Vragen' NOT NULL,
      "subtitle" varchar DEFAULT 'Hier vind je antwoorden op de meest gestelde vragen.',
      "banner_image_id" integer,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    -- Create FAQ Categories Collection Table
    CREATE TABLE IF NOT EXISTS "faq_categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "order" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Create Index for FAQ Categories Slug
    CREATE UNIQUE INDEX IF NOT EXISTS "faq_categories_slug_idx" ON "faq_categories" USING btree ("slug");

    -- Add category_id column to faqs (if not exists, though Payload might have added it)
    ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "category_id" integer;

    -- DATA MIGRATION: Extract unique categories and insert into faq_categories
    DO $$
    DECLARE
      r RECORD;
      cat_id INTEGER;
    BEGIN
      -- Loop through unique categories in faqs
      FOR r IN SELECT DISTINCT category FROM faqs WHERE category IS NOT NULL LOOP
        -- Insert category if not exists and get ID
        INSERT INTO faq_categories (title, slug, "order")
        VALUES (initcap(r.category::text), r.category::text, 0)
        ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
        RETURNING id INTO cat_id;

        -- Update faqs with new category_id
        UPDATE faqs SET category_id = cat_id WHERE category = r.category;
      END LOOP;
    END $$;

    -- Add Foreign Key Constraint
    DO $$ BEGIN
      ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_faq_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."faq_categories"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Create Index for category_id
    CREATE INDEX IF NOT EXISTS "faqs_category_idx" ON "faqs" USING btree ("category_id");

    -- Drop old category column and type
    ALTER TABLE "faqs" DROP COLUMN IF EXISTS "category";
    DROP TYPE IF EXISTS "public"."enum_faqs_category";

    -- Add Foreign Key for FAQ Page Banner
    DO $$ BEGIN
      ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "faq_page_banner_image_id_idx" ON "faq_page" USING btree ("banner_image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Recreate Enum Type
    CREATE TYPE "public"."enum_faqs_category" AS ENUM('algemeen', 'inschrijvingen', 'kampen', 'verhuur', 'financieel');

    -- Add back category column
    ALTER TABLE "faqs" ADD COLUMN "category" "enum_faqs_category";

    -- DATA MIGRATION: Restore category string from relationship
    UPDATE faqs f
    SET category = (SELECT slug::"enum_faqs_category" FROM faq_categories fc WHERE fc.id = f.category_id);

    -- Drop new columns and tables
    ALTER TABLE "faqs" DROP CONSTRAINT "faqs_category_id_faq_categories_id_fk";
    ALTER TABLE "faqs" DROP COLUMN "category_id";
    DROP TABLE "faq_categories";
    DROP TABLE "faq_page";
  `)
}
