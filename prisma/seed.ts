import { PrismaClient } from '@prisma/client';
// import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

const USER = {
  username: 'test2',
  email: 'test2@email.com'
}

async function main() {
  // const salt = await genSalt(12);
  // const hashedPassword = await hash(USER.password, salt);
  await prisma.user.create({ data: USER });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
