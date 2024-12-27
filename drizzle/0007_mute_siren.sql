ALTER TABLE "user" ALTER COLUMN "plan" SET DEFAULT 'FREE';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "_refresh_session";