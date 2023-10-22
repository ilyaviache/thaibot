import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SettingKey, Setting, Areas, Presets } from '@prisma/client';

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

  AREAS() {
    return this.areas;
  }

  PRESETS() {
    return this.presets;
  }

  async reload() {
    await this.onModuleInit();
  }
}
