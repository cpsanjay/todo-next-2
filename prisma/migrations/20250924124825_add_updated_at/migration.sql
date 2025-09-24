-- DropIndex
DROP INDEX "public"."Todos_id_key";

-- AlterTable
ALTER TABLE "public"."Todos" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
