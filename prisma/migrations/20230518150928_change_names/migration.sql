/*
 Warnings:
 
 - You are about to drop the column `chat_id` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `created_at` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `listen_chat_usernames` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `listen_words` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `mute_chat_usernames` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `mute_words` on the `Works` table. All the data in the column will be lost.
 - You are about to drop the column `updated_at` on the `Works` table. All the data in the column will be lost.
 - Added the required column `chatId` to the `Works` table without a default value. This is not possible if the table is not empty.
 
 */
-- DropIndex
DROP INDEX "Works_chat_id_idx";
-- DropIndex
DROP INDEX "Works_listen_chat_usernames_idx";
-- DropIndex
DROP INDEX "Works_listen_words_idx";
-- AlterTable
ALTER TABLE "Works" DROP COLUMN "chat_id",
  DROP COLUMN "created_at",
  DROP COLUMN "listen_chat_usernames",
  DROP COLUMN "listen_words",
  DROP COLUMN "mute_chat_usernames",
  DROP COLUMN "mute_words",
  DROP COLUMN "updated_at",
  ADD COLUMN "chatId" TEXT NOT NULL,
  ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN "listenChatUsernames" TEXT [],
  ADD COLUMN "listenWords" TEXT [],
  ADD COLUMN "muteChatUsernames" JSON [],
  ADD COLUMN "muteWords" JSON [],
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- CreateIndex
CREATE INDEX "Works_chatId_idx" ON "Works"("chatId");
-- CreateIndex
CREATE INDEX "Works_listenChatUsernames_idx" ON "Works"("listenChatUsernames");
-- CreateIndex
CREATE INDEX "Works_listenWords_idx" ON "Works"("listenWords");