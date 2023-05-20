import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Action, Hears } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ACCOUNTS_SCENE } from './bot.constants';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';
import { BotService } from './bot.service';
import { COMMANDS } from './bot.constants';
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

  // @Action(COMMANDS.ACCOUNTS)
  // async onEstate(@Ctx() context: Context) {
  //   await context.scene.enter(ACCOUNTS_SCENE);
  // }

  @Hears('hi')
  async hears(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }

  @Hears('Button 1')
  private handleButton1(@Ctx() ctx: Context): void {
    ctx.reply('Button 1 was pressed');
    // Добавьте здесь логику, которую вы хотите выполнить при нажатии на кнопку 1
  }

  //   @Action(COMMANDS.USDT_TO_EUR)
  //   async onUsdtToEur(@Ctx() context: Context) {
  //     await context.scene.enter(MARKET_SCENE);
  //   }

  //   @Action(COMMANDS.EUR_TO_USDT)
  //   async onEurToUsdt(@Ctx() context: Context) {
  //     await context.scene.enter(EUR_TO_USDT_AMOUNT_SCENE);
  //   }

  //   @Action(COMMANDS.ESTATE)
  //   async onEstate(@Ctx() context: Context) {
  //     await context.scene.enter(ESTATE_SCENE);
  //   }

  //   @Hears(new RegExp(/\/approve\s(.*)/))
  //   async onApprove(@Ctx() context: Context) {
  //     if (context.match && context.match[1]) {
  //       const orderId = context.match[1];
  //       const updateOrderDto = {
  //         status: OrderStatus.IN_CHECK,
  //       };
  //       await this.orderService.update(orderId, updateOrderDto);
  //     }
  //     return;
  //   }
}
