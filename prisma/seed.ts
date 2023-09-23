import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  console.log('seed');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
