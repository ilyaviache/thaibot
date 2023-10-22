import { PrismaClient, SettingKey } from '@prisma/client';
import { PRESETS, AREAS, TEXTS, TEXTS_NEW } from '../src/bot/bot.constants';

const prisma = new PrismaClient();

const presets = PRESETS;
const areas = AREAS;
const texts = TEXTS;

async function seed() {
  await prisma.setting.deleteMany();
  await prisma.presets.deleteMany();
  await prisma.areas.deleteMany();

  await prisma.setting.create({
    data: {
      id: SettingKey.DEVELOPMENT,
      TEXTS: TEXTS_NEW,
      VALUE: [],
    },
  });

  for (const preset of presets) {
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

  for (const area of areas) {
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
