/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Room_id_userId_key" ON "Room"("id", "userId");
