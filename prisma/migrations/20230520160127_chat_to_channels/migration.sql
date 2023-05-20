/*
  Warnings:

  - You are about to drop the column `listenChatUsernames` on the `Works` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Works_listenChatUsernames_idx";

-- AlterTable
ALTER TABLE "Works" DROP COLUMN "listenChatUsernames",
ADD COLUMN     "listenChannelUsernames" TEXT[],
ADD COLUMN     "muteChannelUsernames" JSON[],
ALTER COLUMN "muteWords" SET DATA TYPE TEXT[],
ALTER COLUMN "muteUsernames" SET DATA TYPE TEXT[];

-- CreateIndex
CREATE INDEX "Works_listenChannelUsernames_idx" ON "Works"("listenChannelUsernames");
