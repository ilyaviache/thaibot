-- CreateTable
CREATE TABLE "Messages" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "workId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Messages_workId_idx" ON "Messages"("workId");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Works"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
