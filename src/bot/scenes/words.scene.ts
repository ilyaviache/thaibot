import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears } from 'nestjs-telegraf';
import {
  WORDS_SCENE,
  WORDS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { BotService } from '../bot.service';
import { Markup } from 'telegraf';

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

    await ctx.reply(TEXTS.WORDS.MAIN, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS_DELETE_ALL.text)
  async handleBackToMenu(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.OK, MENU_BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.WORDS.MAIN, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS_ADD.text)
  async handleWordsAdd(@Ctx() ctx: Context) {
    await await ctx.scene.enter(WORDS_ADD_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS_LIST.text)
  async handleWordsList(@Ctx() ctx: Context) {
    const words = ctx.session.work.muteWords;
    console.log('words', words);
    const inlineKeyboard = [];

    words.forEach((word, i) => {
      inlineKeyboard.push([
        { text: `↩️ ${word}`, callback_data: `delete_word_${i}` },
      ]);
    });

    inlineKeyboard.push([MENU_BUTTONS.BACK]);
    try {
      // };
      const replyMarkup = {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };

      await ctx.reply('ASdasd', replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(MENU_BUTTONS.CANCEL.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await this.onSceneEnter(ctx);
    return;
  }
}
