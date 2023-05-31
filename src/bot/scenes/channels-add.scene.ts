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

@Scene(CHANNELS_ADD_SCENE)
@UseFilters(BotFilter)
export class ChannelsAddScene {
  constructor(private readonly worksService: WorksService) {}
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

  @Hears('channel_' + MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(CHANNELS_SCENE);
  }

  @Hears(RegExp('.'))
  async handleWordAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    if (ctx.scene.current.id === CHANNELS_ADD_SCENE) {
      const username = ctx.update['message']['text'];
      if (username === MENU_BUTTONS.BACK.text || username === '/start') {
        return next();
      }
      try {
        const result = await this.worksService.addMuteChannel(
          ctx.session.work,
          username
        );

        ctx.session.work = result;
      } catch (e) {
        console.log(e);
      }
    } else {
      return next();
    }

    await this.onSceneEnter(ctx);
    return;
  }
}
