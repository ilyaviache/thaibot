/*
  Warnings:

  - A unique constraint covering the columns `[chatId]` on the table `Works` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Works_chatId_key" ON "Works"("chatId");
