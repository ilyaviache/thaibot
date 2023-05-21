import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears } from 'nestjs-telegraf';
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
  constructor(private readonly worksService: WorksService) { }
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

  @Hears()
  async handleWordAdd(@Ctx() ctx: Context) {
    console.log('ctx', ctx);
    const word = ctx.message['text'];
    try {
      const result = await this.worksService.addMuteWord(
        ctx.session.work,
        word
      );
      console.log('result', result);
      ctx.session.work = result;
    } catch (e) {
      console.log(e);
      return;
    }
    return;
  }
}
