-- AlterTable
ALTER TABLE "achievements" ADD COLUMN     "buttonEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "buttonText" TEXT,
ADD COLUMN     "buttonUrl" TEXT;

-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "buttonEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "buttonText" TEXT,
ADD COLUMN     "buttonUrl" TEXT;

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bio" TEXT,
    "linkedin" TEXT,
    "instagram" TEXT,
    "github" TEXT,
    "website" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);
