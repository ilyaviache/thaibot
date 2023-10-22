import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SettingKey, Setting, Areas, Presets } from '@prisma/client';

import { Markup } from 'telegraf';
import { COMMANDS } from './settings.module';

@Injectable()
export class SettingsService implements OnModuleInit {
  private settings: Setting;
  private areas: Areas[]; // В зависимости от вашей модели, тип может быть другим
  private presets: Presets[]; // В зависимости от вашей модели, тип может быть другим

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.loadSettingsFromDb();
    await this.loadAreasFromDb();
    await this.loadPresetsFromDb();
  }

  private async loadSettingsFromDb() {
    this.settings = await this.prisma.setting.findUnique({
      where: {
        id: SettingKey.MAIN,
      },
    });
  }

  private async loadAreasFromDb() {
    this.areas = await this.prisma.areas.findMany();
  }

  private async loadPresetsFromDb() {
    this.presets = await this.prisma.presets.findMany();
  }

  TEXTS(...args: string[]): string {
    return this.settings.TEXTS;
  }

  fillTexts(text: string, ...args: string[]): string {
    return text.replace(
      /\$(\d+)/g,
      (_, index) => args[Number(index) - 1] || ''
    );
  }
  E;
  AREAS() {
    return this.areas;
  }

  PRESETS() {
    return this.presets;
  }

  MENU_BUTTONS() {
    return {
      TASKS: { text: '🕵️ Управление прослушкой' },
      ACCOUNTS: { text: '🚫 Стоп аккаунты' },
      AREA: { text: '🏝 Регион работы' },
      WORKS: { text: '❇️ Ключевые слова' },
      WORDS: { text: '🚫 Стоп фразы' },
      PAYMENT: { text: '💸 Оплата' },
      CHANNELS: { text: '🚫 Стоп чаты' },
      SUPPORT: { text: '🙋‍♂️ Поддержка' },
      MAIN_MENU: { text: '🏠 Главное меню' },

      ACCOUNTS_LIST: { text: '📋 Список игнорируемых аккаунтов' },
      ACCOUNTS_ADD: { text: '➕ Добавить новый' },
      ACCOUNTS_DELETE_ALL: { text: '🗑 Удалить все' },

      WORKS_LIST: { text: '📋 Ключевые слова' },
      WORKS_ADD: { text: '➕ Добавить новое' },
      WORKS_DELETE_ALL: { text: '🗑 Удалить все' },

      WORDS_LIST: { text: '📋 Список игнорируемых фраз' },
      WORDS_ADD: { text: '➕ Добавить новое' },
      WORDS_DELETE_ALL: { text: '🗑 Удалить все' },

      CHANNELS_LIST: { text: '📋 Список игнорируемых чатов' },
      CHANNELS_ADD: { text: '➕ Добавить игнорируемый чат' },
      CHANNELS_DELETE_ALL: { text: '🗑 Удалить все' },

      BACK_TO_MENU: { text: 'Вернуться в меню' },
      OK: { text: '✅' },
      CANCEL: { text: '⛔️' },
      BACK: { text: '⬅ Назад', callback_data: 'BACK' },
    };
  }

  COMMANDS() {
    return {
      START: 'start',
      BACK: 'BACK',
      OK: 'OK',
      NO: 'CANCEL',
      CANCEL: 'CANCEL',
      CONTINUE: 'CONTINUE',
      START_LISTEN: 'START_LISTEN',
      ADD_TASK: 'ADD_TASK',
    };
  }

  BUTTONS() {
    return {
      BACK: Markup.button.callback('⬅ Назад ️', this.COMMANDS().BACK),
      OK: Markup.button.callback('✅', this.COMMANDS().OK),
      NO: Markup.button.callback('⛔️', this.COMMANDS().NO),
      CANCEL: Markup.button.callback('⛔️', this.COMMANDS().CANCEL),
      CONTINUE: Markup.button.callback(
        '➡️ продолжить',
        this.COMMANDS().CONTINUE
      ),
      START_LISTEN: Markup.button.callback(
        '👂 Слушать бесплатно',
        this.COMMANDS().START_LISTEN
      ),
      ADD_TASK: Markup.button.callback('➕ Добавить новую задачу', 'ADD_TASK'),
    };
  }

  async reload() {
    await this.onModuleInit();
  }
}
