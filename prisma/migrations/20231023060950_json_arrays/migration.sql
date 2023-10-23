/*
  Warnings:

  - The `usernames` column on the `Areas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `words` column on the `Presets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `minus_words` column on the `Presets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Areas" DROP COLUMN "usernames",
ADD COLUMN     "usernames" JSONB[];

-- AlterTable
ALTER TABLE "Presets" DROP COLUMN "words",
ADD COLUMN     "words" JSONB[],
DROP COLUMN "minus_words",
ADD COLUMN     "minus_words" JSONB[];
