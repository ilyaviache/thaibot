import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action, Next } from 'nestjs-telegraf';
import {
  WORDS_SCENE,
  WORDS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
  BUTTONS,
  TASKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from 'src/bot/bot-navigation.service';
import { SettingsService } from 'src/settings/settings.service';

@Scene(WORDS_SCENE)
@UseFilters(BotFilter)
export class WordsScene {
  constructor(
    private readonly worksService: WorksService,
    private readonly botNavigationService: BotNavigationService,
    private readonly settingsService: SettingsService
  ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    if (!ctx.session.user) {
      await this.botNavigationService.start(ctx);
      return;
    }
    const replyMarkup = {
      reply_markup: {
        keyboard: this.settingsService.MENUS().WORDS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().WORDS.MAIN, replyMarkup);

    await this.handleWordsList(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS_DELETE_ALL.text)
  async handleWordsDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        inline_keyboard: [[BUTTONS.OK, BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().WORDS.DELETE, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.WORDS_ADD.text)
  async handleWordsAdd(@Ctx() ctx: Context) {
    await await ctx.scene.enter(WORDS_ADD_SCENE);
    return;
  }

  // @Hears(MENU_BUTTONS.WORDS_LIST.text)
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

      await ctx.reply(this.settingsService.TEXTS().WORDS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(BUTTONS.OK.callback_data)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllMuteWords(ctx.session.work);
    ctx.session.work = result;
    await this.onSceneEnter(ctx);
    return;
  }

  @Action(BUTTONS.CANCEL.callback_data)
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
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }

  @Hears(RegExp('.'))
  async handleWordAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    await this.botNavigationService.handleMuteWordAdd(ctx, next);
    await this.onSceneEnter(ctx);
    return;
  }
}
