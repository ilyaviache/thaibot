import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Hears } from 'nestjs-telegraf';
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
} from './bot.constants';
import { createWorksDtoFactory } from './bot.utils';

import { WorksService } from 'src/works/works.service';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly worksService: WorksService
  ) {}

  // TODO: сейчас если пользователь восстановил сессию и не нажал комманду start обьект work пустой. Критический баг

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('ctx', ctx);
    try {
      const createWorksDto = createWorksDtoFactory(ctx.from);
      const result = await this.worksService.startWork(createWorksDto);
      ctx.session.work = result;
    } catch (e) {
      console.log(e);
    }
    await this.botService.start(ctx);
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
}
