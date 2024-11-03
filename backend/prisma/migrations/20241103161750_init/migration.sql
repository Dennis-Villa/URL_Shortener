/*
  Warnings:

  - Added the required column `userId` to the `UrlModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UrlModel" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- AddForeignKey
ALTER TABLE "UrlModel" ADD CONSTRAINT "UrlModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
