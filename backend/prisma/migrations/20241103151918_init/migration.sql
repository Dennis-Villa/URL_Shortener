/*
  Warnings:

  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Url";

-- CreateTable
CREATE TABLE "UrlModel" (
    "id" SERIAL NOT NULL,
    "type" "Url_Type" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_url" VARCHAR NOT NULL,
    "short_url" VARCHAR NOT NULL,

    CONSTRAINT "UrlModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlModel_short_url_key" ON "UrlModel"("short_url");
