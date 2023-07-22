-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "firstname" TEXT,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "selectedChatsId" INTEGER,
    "listenChannelUsernames" TEXT[],
    "listenWords" TEXT[],
    "muteChannelUsernames" JSON[],
    "muteUsernames" JSON[],
    "muteWords" TEXT[],
    "userId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chatId_key" ON "User"("chatId");

-- CreateIndex
CREATE INDEX "User_chatId_idx" ON "User"("chatId");

-- CreateIndex
CREATE INDEX "Works_chatId_idx" ON "Works"("chatId");

-- CreateIndex
CREATE INDEX "Works_userId_idx" ON "Works"("userId");

-- CreateIndex
CREATE INDEX "Works_listenChannelUsernames_idx" ON "Works"("listenChannelUsernames");

-- CreateIndex
CREATE INDEX "Works_listenWords_idx" ON "Works"("listenWords");

-- AddForeignKey
ALTER TABLE "Works" ADD CONSTRAINT "Works_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
