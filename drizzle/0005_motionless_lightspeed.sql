ALTER TABLE "user" ALTER COLUMN "plan" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "apiKey" ADD COLUMN "_refresh_session" boolean DEFAULT false NOT NULL;