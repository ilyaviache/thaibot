import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Hears, Action } from 'nestjs-telegraf';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';

import {
  MENUS,
  MENU_BUTTONS,
  WORKS_SCENE,
  WORDS_SCENE,
  CHANNELS_SCENE,
  ACCOUNTS_SCENE,
  AREA_SCENE,
  BUTTONS,
  TASKS_SCENE,
  TEXTS,
  COMMANDS,
} from './bot.constants';
import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { BotNavigationService } from './bot-navigation.service';
import { log } from 'console';
import { session } from 'telegraf';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly botNavigationService: BotNavigationService,
    private readonly worksService: WorksService,
    private readonly usersService: UsersService
  ) {}

  // TODO: протестировать edge cases работы с сессиями


  // при изменение этого кода следуте также изменить функцию start в bot-navigation.service.ts
  @Start()
  async onStart(@Ctx() ctx: Context) {
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

    // TODO: nsvigation service doesnt work
    // await this.botNavigationService.start(ctx);
    await ctx.reply(TEXTS.MAIN.MAIN_MENU, replyMarkup);
    return;
  }
  @Hears(MENU_BUTTONS.AREA.text)
  async handleAreaMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(AREA_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.WORKS.text)
  async handleWorksMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(WORKS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS.text)
  async handleWordsMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(WORDS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.CHANNELS.text)
  async handleChannelsMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(CHANNELS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.ACCOUNTS.text)
  async handleAccountsMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(ACCOUNTS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.BACK_TO_MENU.text)
  async handleBackToMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Action(BUTTONS.START_LISTEN.callback_data)
  async createFirstTask(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.TASKS.text)
  async handleMainMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.MAIN_MENU.text)
  async handleTasksMenu(@Ctx() ctx: Context) {
    await this.onStart(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.SUPPORT.text)
  async handleSupportMenu(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.MAIN.SUPPORT, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.PAYMENT.text)
  async handlePaymentMenu(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.MAIN.PAYMENT, replyMarkup);
    return;
  }

  @Action(COMMANDS.ADD_TASK)
  async handleAddTask(@Ctx() ctx: Context) {
    ctx.session.taskWizardOn = true;
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await this.onStart(ctx);
  }

  @Action(/select_work_\w+/)
  async handleSelectWork(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const workId = callbackData.split('_')[2];

    // service doesnt work await this.botNavigationService.selectActiveWorkById(ctx, workId);
    const work = await this.worksService.findById(workId);
    if (!work) {
      //
    } else {
      ctx.session.work = work;
    }
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Action(/mute_channel@\w+/)
  async handleMuteChannel(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const params = callbackData.split('@');

    if (!params || !params[1] || !params[2]) return;

    const username = params[1];
    const workId = params[2];

    const work = await this.worksService.findById(workId);
    await this.worksService.addMuteChannel(work, username);

    return '✅';
  }

  @Action(/mute_username@\w+/)
  async handleMuteUsername(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const params = callbackData.split('@');

    if (!params || !params[1] || !params[2]) return;

    const username = params[1];
    const workId = params[2];

    const work = await this.worksService.findById(workId);
    await this.worksService.addMuteAccount(work, username);

    return '✅';
  }
}
