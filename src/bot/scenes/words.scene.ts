import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action } from 'nestjs-telegraf';
import {
  WORDS_SCENE,
  WORDS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(WORDS_SCENE)
@UseFilters(BotFilter)
export class WordsScene {
  constructor(private readonly worksService: WorksService) {}
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
  async handleWordsDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.OK, MENU_BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.WORDS.DELETE, replyMarkup);
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
    const inlineKeyboard = [];

    words.forEach((word, i) => {
      inlineKeyboard.push([
        { text: `↩️ ${word}`, callback_data: `delete_word_${i}` },
      ]);
    });

    inlineKeyboard.push([MENU_BUTTONS.BACK]);
    try {
      const replyMarkup = {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };

      await ctx.reply(TEXTS.WORDS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(MENU_BUTTONS.OK.text)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllMuteWords(ctx.session.work);
    ctx.session.work = result;
    await this.onSceneEnter(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.CANCEL.text)
  async handleCancel(@Ctx() ctx: Context) {
    await this.onSceneEnter(ctx);
    return;
  }

  @Action(/delete_word_\d+/)
  async handleDeleteWord(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const wordIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.removeMuteWord(
      ctx.session.work,
      wordIndex
    );
    ctx.session.work = result;
    await this.handleWordsList(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await this.onSceneEnter(ctx);
    return;
  }
}
