/*
  Warnings:

  - Made the column `name` on table `UserModel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UrlModel" DROP CONSTRAINT "UrlModel_userId_fkey";

-- AlterTable
ALTER TABLE "UrlModel" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserModel" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UrlModel" ADD CONSTRAINT "UrlModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
