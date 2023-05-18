-- CreateIndex
CREATE INDEX "Works_chat_id_idx" ON "Works"("chat_id");

-- CreateIndex
CREATE INDEX "Works_listen_chat_usernames_idx" ON "Works"("listen_chat_usernames");

-- CreateIndex
CREATE INDEX "Works_listen_words_idx" ON "Works"("listen_words");
