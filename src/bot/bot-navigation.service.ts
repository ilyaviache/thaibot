import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import {
  MENUS,
  TEXTS,
  AREAS,
  MENU_BUTTONS,
  BUTTONS,
  PRESETS,
} from './bot.constants';

import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { Works } from '@prisma/client';

@Injectable()
export class BotNavigationService {
  constructor(
    private readonly worksService: WorksService,
    private readonly usersService: UsersService
  ) {}

  async start(ctx: Context): Promise<any> {
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.MAIN.WELCOME, replyMarkup);
  }

  async firstTouch(ctx: Context): Promise<any> {
    const inline_keyboard = [[BUTTONS.START_LISTEN]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    await ctx.reply(TEXTS.MAIN.WELCOME, replyMarkup);
  }

  async showMainMenu(ctx: Context): Promise<any> {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.MAIN.MAIN_MENU, replyMarkup);
  }

  async selectActiveWorkById(ctx: Context, workId: string): Promise<any> {
    const work = await this.worksService.findById(workId);
    if (!work) {
      //
    } else {
      ctx.session.work = work;
    }
  }

  async showTaskMenu(ctx: Context): Promise<any> {
    const name = ctx.session.work.name;
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.TASK_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.TASKS.TASK_MENU(name), replyMarkup);
  }

  async selectArea(
    work: Works,
    ctx: Context,
    backButton = false
  ): Promise<any> {
    const inlineKeyboard = [];

    const renderAreaButton = (area, i) => {
      if (work && work.selectedChatsId && work.selectedChatsId === area.id) {
        return { text: `✅ ${area.name}`, callback_data: `select_area_${i}` };
      } else {
        return { text: `${area.name}`, callback_data: `select_area_${i}` };
      }
    };

    AREAS.forEach((area, i) => {
      inlineKeyboard.push([renderAreaButton(area, i)]);
    });

    if (backButton) {
      inlineKeyboard.push([MENU_BUTTONS.BACK]);
    }

    const replyMarkup = {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.AREA.LIST, replyMarkup);
  }

  async selectPreset(ctx: Context): Promise<any> {
    const inlineKeyboard = [];

    PRESETS.forEach((preset, i) => {
      inlineKeyboard.push([
        {
          text: `${preset.name}`,
          callback_data: `select_preset_${preset.id}`,
        },
      ]);
    });

    const replyMarkup = {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.TASKS.PRESET_LIST, replyMarkup);
  }
}
