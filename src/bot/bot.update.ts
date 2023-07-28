import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Hears, Action } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';
import { BotService } from './bot.service';
import {
  MENU_BUTTONS,
  WORKS_SCENE,
  WORDS_SCENE,
  CHANNELS_SCENE,
  ACCOUNTS_SCENE,
  AREA_SCENE,
  BUTTONS,
  TASKS_SCENE,
  TEXTS,
} from './bot.constants';
import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly botService: BotService,
    private readonly worksService: WorksService,
    private readonly usersService: UsersService
  ) {}

  // TODO: сейчас если пользователь восстановил сессию и не нажал комманду start обьект work пустой. Критический баг

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const inline_keyboard = [[BUTTONS.START_LISTEN]];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.MAIN.WELCOME, replyMarkup);
    // TODO: refactor use service
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
    await this.botService.start(ctx);
    return;
  }

  @Action(BUTTONS.START_LISTEN.callback_data)
  async createFirstTask(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
