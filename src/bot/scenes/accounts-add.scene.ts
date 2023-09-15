import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Next } from 'nestjs-telegraf';
import {
  ACCOUNTS_SCENE,
  ACCOUNTS_ADD_SCENE,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(ACCOUNTS_ADD_SCENE)
@UseFilters(BotFilter)
export class AccountsAddScene {
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

  @Hears(MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(ACCOUNTS_SCENE);
  }

  @Hears(RegExp('.'))
  async handleWordAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    if (ctx.scene.current.id === ACCOUNTS_ADD_SCENE) {
      const username = ctx.update['message']['text'];
      if (username === MENU_BUTTONS.BACK.text || username === '/start') {
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
    return;
  }
}
