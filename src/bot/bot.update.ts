import { UseFilters } from '@nestjs/common';
import { InjectBot, Ctx, Start, Update, Action } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ESTATE_SCENE } from './bot.constants';
import { BotFilter } from './bot.filter';
import { Context } from './bot.interface';
import { BotService } from './bot.service';
import { COMMANDS } from './bot.constants';

@Update()
@UseFilters(BotFilter)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService
  ) { }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    // const createUserDto = createUserDtoFactory(ctx.from);
    // await this.userService.createOrUpdate(createUserDto);
    // ctx.session.messageId = undefined;
    // await this.botService.start(ctx);
    await ctx.reply('Привет лох! Вот твой ChatID: ' + ctx.chat.id);
  }

  @Action(COMMANDS.ESTATE)
  async onEstate(@Ctx() context: Context) {
    await context.scene.enter(ESTATE_SCENE);
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
