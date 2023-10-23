import { Injectable } from '@nestjs/common';
import { Context } from './bot.interface';
import {
  MENU_BUTTONS,
  WORDS_SCENE,
  WORDS_ADD_SCENE,
  WORKS_SCENE,
  WORKS_ADD_SCENE,
  CHANNELS_SCENE,
  CHANNELS_ADD_SCENE,
  ACCOUNTS_SCENE,
  ACCOUNTS_ADD_SCENE,
} from './bot.constants';

import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { Works } from '@prisma/client';
import { MessagesService } from 'src/messages/messages.service';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class BotNavigationService {
  constructor(
    private readonly worksService: WorksService,
    private readonly usersService: UsersService,
    private readonly settingsService: SettingsService,
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
      const inline_keyboard = [[this.settingsService.BUTTONS().START_LISTEN]];

      const replyMarkup = {
        reply_markup: {
          inline_keyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };
      await ctx.reply(this.settingsService.TEXTS().MAIN.WELCOME, replyMarkup);
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
      inlineKeyboard.push([this.settingsService.BUTTONS().ADD_TASK]);

      await ctx.reply(this.settingsService.TEXTS().MAIN.START, replyMarkup);
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: this.settingsService.MENUS().MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().MAIN.MAIN_MENU, replyMarkup);
  }

  async firstTouch(ctx: Context): Promise<any> {
    const inline_keyboard = [[this.settingsService.BUTTONS().START_LISTEN]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
    await ctx.reply(this.settingsService.TEXTS().MAIN.WELCOME, replyMarkup);
  }

  async showMainMenu(ctx: Context): Promise<any> {
    const replyMarkup = {
      reply_markup: {
        keyboard: this.settingsService.MENUS().MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(this.settingsService.TEXTS().MAIN.MAIN_MENU, replyMarkup);
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
        keyboard: this.settingsService.MENUS().TASK_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(
      this.settingsService.TEXTS().TASKS.TASK_MENU.replacePlaceholders(name),
      replyMarkup
    );
  }

  async showCurrentWorkStats(ctx: Context): Promise<any> {
    const workId = ctx.session.work.id;
    const createdAt = ctx.session.work.createdAt;

    const inline_keyboard = [
      [
        {
          text: '📋 Показать последние 10 сообщений',
          callback_data: `show_messages_10`,
        },
      ],
      [
        {
          text: '📋 Показать последние 25 сообщений',
          callback_data: `show_messages_25`,
        },
      ],
      [
        {
          text: '📋 Показать последние 100 сообщений',
          callback_data: `show_messages_100`,
        },
      ],
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

    return ctx.reply(
      this.settingsService.TEXTS().TASKS.STATS(daysCount, messagesCount),
      replyMarkup
    );
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

    this.settingsService.AREAS().forEach((area, i) => {
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

    await ctx.reply(this.settingsService.TEXTS().AREA.LIST, replyMarkup);
  }

  async selectPreset(ctx: Context): Promise<any> {
    const inlineKeyboard = [];

    this.settingsService.PRESETS().forEach((preset, i) => {
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

    await ctx.reply(
      this.settingsService.TEXTS().TASKS.PRESET_LIST,
      replyMarkup
    );
  }

  async handleMuteWordAdd(
    ctx: Context,
    next: () => Promise<void>
  ): Promise<any> {
    if (
      ctx.scene.current.id === WORDS_ADD_SCENE ||
      ctx.scene.current.id === WORDS_SCENE
    ) {
      const inputText = ctx.update['message']['text'];

      if (
        inputText === MENU_BUTTONS.BACK.text ||
        inputText === MENU_BUTTONS.BACK_TO_MENU.text ||
        inputText === '/start'
      ) {
        return next();
      }

      // Разделите строку на слова, используя запятую в качестве разделителя.
      const words = inputText
        .split(',')
        .map((word) => word.trim())
        .filter((word) => word);

      for (const word of words) {
        const result = await this.worksService.addMuteWord(
          ctx.session.work,
          word
        );

        ctx.session.work = result;
      }
    } else {
      return next();
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply('✅', replyMarkup);
  }

  async handleWordAdd(ctx: Context, next: () => Promise<void>): Promise<any> {
    if (
      ctx.scene.current.id === WORKS_ADD_SCENE ||
      ctx.scene.current.id === WORKS_SCENE
    ) {
      const inputText = ctx.update['message']['text'];

      if (
        inputText === MENU_BUTTONS.BACK.text ||
        inputText === MENU_BUTTONS.BACK_TO_MENU.text ||
        inputText === '/start'
      ) {
        return next();
      }

      // Разделите строку на слова, используя запятую в качестве разделителя.
      const words = inputText
        .split(',')
        .map((word) => word.trim())
        .filter((word) => word);

      for (const word of words) {
        const result = await this.worksService.addListenWord(
          ctx.session.work,
          word
        );

        ctx.session.work = result;
      }
    } else {
      return next();
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply('✅', replyMarkup);
  }

  async handleChannelAdd(
    ctx: Context,
    next: () => Promise<void>
  ): Promise<any> {
    if (
      ctx.scene.current.id === CHANNELS_ADD_SCENE ||
      ctx.scene.current.id === CHANNELS_SCENE
    ) {
      const username = ctx.update['message']['text'];
      if (
        username === MENU_BUTTONS.BACK.text ||
        username === MENU_BUTTONS.BACK_TO_MENU.text ||
        username === '/start'
      ) {
        return next();
      }
      const result = await this.worksService.addMuteChannel(
        ctx.session.work,
        username
      );

      ctx.session.work = result;
    } else {
      return next();
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply('✅', replyMarkup);
  }

  async handleAccountAdd(
    ctx: Context,
    next: () => Promise<void>
  ): Promise<any> {
    if (
      ctx.scene.current.id === ACCOUNTS_ADD_SCENE ||
      ctx.scene.current.id === ACCOUNTS_SCENE
    ) {
      const username = ctx.update['message']['text'];
      if (
        username === MENU_BUTTONS.BACK.text ||
        username === MENU_BUTTONS.BACK_TO_MENU.text ||
        username === '/start'
      ) {
        return next();
      }
      const result = await this.worksService.addMuteAccount(
        ctx.session.work,
        username
      );

      ctx.session.work = result;
    } else {
      return next();
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply('✅', replyMarkup);
  }
}
