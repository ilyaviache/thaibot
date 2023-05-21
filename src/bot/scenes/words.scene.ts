import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx } from 'nestjs-telegraf';
import { WORDS_SCENE, MENUS, TEXTS } from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';

@Scene(WORDS_SCENE)
@UseFilters(BotFilter)
export class WordsScene {
  constructor(private readonly botService: BotService) { }
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.WORDS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.WORDS.MAIN, replyMarkup);
  }
}
