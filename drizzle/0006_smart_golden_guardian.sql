ALTER TABLE "user" ADD COLUMN "_refresh_session" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "apiKey" DROP COLUMN IF EXISTS "_refresh_session";