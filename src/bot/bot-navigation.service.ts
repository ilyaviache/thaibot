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
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class BotNavigationService {
  constructor(
    private readonly worksService: WorksService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) {}

  async start(ctx: Context): Promise<any> {
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const works = await this.worksService.findByAllByChatId(
      ctx.session.user.chatId
    );
    if (works.length === 0) {
      const inline_keyboard = [[BUTTONS.START_LISTEN]];

      const replyMarkup = {
        reply_markup: {
          inline_keyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      await ctx.reply(TEXTS.MAIN.WELCOME, replyMarkup);
      // todo: service doesn't work
      // await this.botNavigationService.firstTouch(ctx);
    } else {
      // await this.botService.showMainMenu(ctx);
      const inlineKeyboard = [];

      works.forEach((work) => {
        inlineKeyboard.push([
          { text: `${work.name}`, callback_data: `select_work_${work.id}` },
        ]);
      });

      const replyMarkup = {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      inlineKeyboard.push([BUTTONS.ADD_TASK]);

      await ctx.reply(
        'Выберите задачу, кликнув на ее название ниже чтобы открыть меню управления настройкой',
        replyMarkup
      );
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.MAIN.MAIN_MENU, replyMarkup);
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

  async showCurrentWorkStats(ctx: Context): Promise<any> {
    const workId = ctx.session.work.id;
    const createdAt = ctx.session.work.createdAt;

    const inline_keyboard = [
      [{ text: '📋 Показать последние 10 сообщений', callback_data: `show_messages_10` }],
      [{ text: '📋 Показать последние 25 сообщений', callback_data: `show_messages_25` }],
      [{ text: '📋 Показать последние 100 сообщений', callback_data: `show_messages_100` }],
      [{ text: '❌ Удалить задачу', callback_data: `delete_task` }],
    ];

    const messagesCount = await this.messagesService.countAllByWorkId(workId);
    // show how much days pass since work created
    const daysCount = Math.floor(
      (new Date().getTime() - createdAt.getTime()) / (1000 * 3600 * 24)
    );

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.TASKS.STATS(daysCount, messagesCount), replyMarkup);
  }

  async selectArea(
    work: Works,
    ctx: Context,
    backButton = false
  ): Promise<any> {
    const inlineKeyboard = [];

    const renderAreaButton = (area, i) => {
      if (work && work.selectedChatsId && work.selectedChatsId === area.id) {
        return {
          text: `✅ ${area.name}`,
          callback_data: `select_area_${area.id}`,
        };
      } else {
        return {
          text: `${area.name}`,
          callback_data: `select_area_${area.id}`,
        };
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
