import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Next } from 'nestjs-telegraf';
import {
  WORDS_SCENE,
  WORDS_ADD_SCENE,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(WORDS_ADD_SCENE)
@UseFilters(BotFilter)
export class WordsAddScene {
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

    await ctx.reply(TEXTS.WORDS.ADD, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(WORDS_SCENE);
  }

  @Hears(RegExp('.'))
  async handleWordAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    if (ctx.scene.current.id === WORDS_ADD_SCENE) {
      const word = ctx.update['message']['text'];
      if (word === MENU_BUTTONS.BACK.text || word === '/start') {
        return next();
      }
      try {
        const result = await this.worksService.addMuteWord(
          ctx.session.work,
          word
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
