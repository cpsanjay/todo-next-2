-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "public"."Todos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "color" TEXT NOT NULL DEFAULT '#a5b59d'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "public"."User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Todos_id_key" ON "public"."Todos"("id");

-- AddForeignKey
ALTER TABLE "public"."Todos" ADD CONSTRAINT "Todos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
