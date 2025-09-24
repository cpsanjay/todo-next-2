-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "picture" TEXT DEFAULT 'https://avatar.iran.liara.run/public/24',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
