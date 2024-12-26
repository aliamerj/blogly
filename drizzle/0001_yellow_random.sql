DO $$ BEGIN
 CREATE TYPE "public"."plan" AS ENUM('FREE', 'OLD', 'PRO');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "plan" "plan";