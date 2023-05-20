import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { ACCOUNTS_SCENE } from '../bot.constants';
import { COMMANDS } from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';

@Scene(ACCOUNTS_SCENE)
@UseFilters(BotFilter)
export class AccountsScene {
  constructor(private readonly botService: BotService) { }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await this.botService.accounts(ctx);
    return;
  }

  @Action(COMMANDS.BACK)
  async onBackAction(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    return;
  }
}
