/*
  Warnings:

  - You are about to drop the column `muteChatUsernames` on the `Works` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Works" DROP COLUMN "muteChatUsernames",
ADD COLUMN     "muteUsernames" JSON[];
