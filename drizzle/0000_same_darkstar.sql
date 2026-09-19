CREATE TYPE "public"."event_status" AS ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'to_be_defined');--> statement-breakpoint
CREATE TYPE "public"."publication_status" AS ENUM('draft', 'approved', 'archived');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('received', 'under_review', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "bibliography" (
	"id" serial PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"title" text NOT NULL,
	"year" integer,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"why_read" text NOT NULL,
	"reading_level" text NOT NULL,
	"url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"date" date NOT NULL,
	"location" text,
	"theme" text,
	"work" text,
	"authors" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"description" text NOT NULL,
	"content" text NOT NULL,
	"cover_image" text,
	"photographs" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"posters" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"materials" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"related_texts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"date" date NOT NULL,
	"start_time" time,
	"end_time" time,
	"location" text,
	"theme" text,
	"work" text,
	"status" "event_status" DEFAULT 'to_be_defined' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publications" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"authors" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"type" text NOT NULL,
	"summary" text NOT NULL,
	"content" text NOT NULL,
	"status" "publication_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"title" text NOT NULL,
	"contribution_type" text NOT NULL,
	"message" text,
	"content" text NOT NULL,
	"file_url" text,
	"file_name" text,
	"file_type" text,
	"file_size" integer,
	"source_hash" text,
	"status" "submission_status" DEFAULT 'received' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_records" ADD CONSTRAINT "event_records_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bibliography_category_idx" ON "bibliography" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "event_records_slug_uidx" ON "event_records" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "event_records_date_idx" ON "event_records" USING btree ("date");--> statement-breakpoint
CREATE INDEX "events_date_idx" ON "events" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "publications_slug_uidx" ON "publications" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "publications_status_date_idx" ON "publications" USING btree ("status","published_at");--> statement-breakpoint
CREATE INDEX "submissions_status_date_idx" ON "submissions" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "submissions_source_date_idx" ON "submissions" USING btree ("source_hash","created_at");