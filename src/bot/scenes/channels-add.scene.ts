import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Next } from 'nestjs-telegraf';
import {
  CHANNELS_SCENE,
  CHANNELS_ADD_SCENE,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from 'src/bot/bot-navigation.service';

@Scene(CHANNELS_ADD_SCENE)
@UseFilters(BotFilter)
export class ChannelsAddScene {
  constructor(private readonly worksService: WorksService, 
    private readonly botNavigationService: BotNavigationService) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.CHANNELS.ADD, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(CHANNELS_SCENE);
  }

  @Hears(RegExp('.'))
  async handleChannelAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    await this.botNavigationService.handleChannelAdd(ctx, next);
    return;
  }
}
