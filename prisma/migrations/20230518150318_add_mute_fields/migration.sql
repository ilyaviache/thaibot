-- AlterTable
ALTER TABLE "Works" ADD COLUMN     "mute_chat_usernames" JSON[],
ADD COLUMN     "mute_words" JSON[];
