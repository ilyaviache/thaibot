-- CreateTable
CREATE TABLE "Works" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "listen_chat_usernames" TEXT[],
    "listen_words" TEXT[],
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);
