-- CreateEnum
CREATE TYPE "SettingKey" AS ENUM ('MAIN', 'DEVELOPMENT');

-- CreateTable
CREATE TABLE "Setting" (
    "id" "SettingKey" NOT NULL,
    "TEXTS" JSONB NOT NULL,
    "VALUE" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presets" (
    "id" SERIAL NOT NULL,
    "priority" INTEGER DEFAULT 0,
    "alias" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "words" JSONB NOT NULL,
    "minus_words" JSONB NOT NULL,

    CONSTRAINT "Presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Areas" (
    "id" SERIAL NOT NULL,
    "priority" INTEGER DEFAULT 0,
    "alias" TEXT,
    "name" TEXT,
    "usernames" JSONB NOT NULL,

    CONSTRAINT "Areas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Presets_alias_key" ON "Presets"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Areas_alias_key" ON "Areas"("alias");
