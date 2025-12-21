-- Add button fields to announcements table
ALTER TABLE "announcements" ADD COLUMN "buttonText" TEXT;
ALTER TABLE "announcements" ADD COLUMN "buttonUrl" TEXT;
ALTER TABLE "announcements" ADD COLUMN "buttonEnabled" BOOLEAN NOT NULL DEFAULT false;

-- Add button fields to achievements table
ALTER TABLE "achievements" ADD COLUMN "buttonText" TEXT;
ALTER TABLE "achievements" ADD COLUMN "buttonUrl" TEXT;
ALTER TABLE "achievements" ADD COLUMN "buttonEnabled" BOOLEAN NOT NULL DEFAULT false;