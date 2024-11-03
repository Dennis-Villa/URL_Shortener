-- CreateEnum
CREATE TYPE "Url_Type" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "type" "Url_Type" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_url" VARCHAR NOT NULL,
    "short_url" VARCHAR NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
