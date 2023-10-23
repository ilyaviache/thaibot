import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SettingKey, Setting, Areas, Presets } from '@prisma/client';

import { Markup } from 'telegraf';

@Injectable()
export class SettingsService implements OnModuleInit {
  private path: string[] = [];
  public _settings: Setting;
  public _areas: Areas[]; // В зависимости от вашей модели, тип может быть другим
  public _presets: Presets[]; // В зависимости от вашей модели, тип может быть другим

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.loadSettingsFromDb();
    await this.loadAreasFromDb();
    await this.loadPresetsFromDb();
  }

  private async loadSettingsFromDb() {
    this._settings = await this.prisma.setting.findUnique({
      where: {
        id: SettingKey.MAIN,
      },
    });
  }

  private async loadAreasFromDb() {
    this._areas = await this.prisma.areas.findMany();
  }

  private async loadPresetsFromDb() {
    this._presets = await this.prisma.presets.findMany();
  }

  public SETTINGS(): any {
    return this._settings;
  }

  public TEXTS(): any {
    // return this._settings.TEXTS;
    return this.proxyHandler(this.path);
  }

  private proxyHandler(path: string[]): any {
    const value = this.getFromPath(path);
    if (value !== undefined && typeof value !== 'object') {
      return value;
    }

    return new Proxy(
      {},
      {
        get: (target, prop: string) => {
          if (prop === 'replacePlaceholders') {
            return (...args: string[]) => {
              const template = this.getFromPath(path);
              if (typeof template !== 'string') {
                throw new Error(
                  'replacePlaceholders can only be called on string properties.'
                );
              }
              return this.replacePlaceholders(template, ...args);
            };
          }
          const newValue = this.getFromPath([...path, prop]);
          if (typeof newValue === 'string' || newValue === undefined) {
            return newValue;
          }
          return this.proxyHandler([...path, prop]);
        },
      }
    );
  }

  private getFromPath(path: string[]) {
    return path.reduce((acc, part) => acc[part], this._settings.TEXTS);
  }

  private replacePlaceholders(text: string, ...args: string[]): string {
    return text.replace(
      /\&(\d+)/g,
      (_, index) => args[Number(index) - 1] || ''
    );
  }

  public AREAS(): any {
    return this._areas;
  }

  public PRESETS(): any {
    return this._presets;
  }

  public MENU_BUTTONS(): any {
    return this._settings.MENU_BUTTONS;
  }

  public COMMANDS(): any {
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

  public BUTTONS(): any {
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
