/*
  Warnings:

  - You are about to drop the column `chatId` on the `Messages` table. All the data in the column will be lost.
  - Added the required column `channelUsername` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "chatId",
ADD COLUMN     "channelUsername" TEXT NOT NULL;
