import { PrismaClient, SettingKey } from '@prisma/client';
import { PRESETS, AREAS, TEXTS, MENU_BUTTONS } from '../src/bot/bot.constants';

const prisma = new PrismaClient();

async function seed() {
  await prisma.setting.deleteMany();
  await prisma.presets.deleteMany();
  await prisma.areas.deleteMany();

  await prisma.setting.create({
    data: {
      id: SettingKey.MAIN,
      TEXTS: TEXTS,
      MENU_BUTTONS: MENU_BUTTONS,
      VALUE: [],
    },
  });

  for (const preset of PRESETS) {
    await prisma.presets.create({
      data: {
        id: preset.id,
        alias: preset.alias,
        name: preset.name,
        words: preset.words,
        minus_words: preset.minus_words,
      },
    });
  }

  for (const area of AREAS) {
    await prisma.areas.create({
      data: {
        id: area.id,
        alias: area.alias,
        name: area.name,
        usernames: area.usernames,
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
