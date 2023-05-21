import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Hears } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';
import { BotService } from './bot.service';
import { MENU_BUTTONS, WORDS_SCENE } from './bot.constants';
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
  ) { }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    try {
      const createWorksDto = createWorksDtoFactory(ctx.from);
      const result = await this.worksService.startWork(createWorksDto);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    await this.botService.start(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS.text)
  async handleAccountsMenu(@Ctx() ctx: Context) {
    await ctx.scene.enter(WORDS_SCENE);
  }

  @Hears(MENU_BUTTONS.BACK_TO_MENU.text)
  async handleBackToMenu(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    return;
  }
}
