import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action } from 'nestjs-telegraf';
import {
  WORKS_SCENE,
  WORKS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
  TASKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from 'src/bot/bot-navigation.service';

@Scene(WORKS_SCENE)
@UseFilters(BotFilter)
export class WorksScene {
  constructor(private readonly worksService: WorksService,
    private readonly botNavigationService: BotNavigationService
    ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    if (!ctx.session.user) {
      await this.botNavigationService.start(ctx);
      return;
    }
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.WORKS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.WORKS.MAIN, replyMarkup);
    // show words
    await this.handleWorksList(ctx);

    return;
  }

  @Hears(MENU_BUTTONS.WORKS_DELETE_ALL.text)
  async handleWorksDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.OK, MENU_BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.WORKS.DELETE, replyMarkup);
    await this.handleWorksList(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.WORKS_ADD.text)
  async handleWorksAdd(@Ctx() ctx: Context) {
    await await ctx.scene.enter(WORKS_ADD_SCENE);
    return;
  }

  // @Hears(MENU_BUTTONS.WORKS_LIST.text)
  async handleWorksList(@Ctx() ctx: Context) {
    const words = ctx.session.work.listenWords;
    const inlineKeyboard = [];

    words.forEach((word, i) => {
      inlineKeyboard.push([
        { text: `↩️ ${word}`, callback_data: `delete_work_${i}` },
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

      await ctx.reply(TEXTS.WORKS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(MENU_BUTTONS.OK.text)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllListenWords(
      ctx.session.work
    );
    ctx.session.work = result;
    await this.onSceneEnter(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.CANCEL.text)
  async handleCancel(@Ctx() ctx: Context) {
    await this.onSceneEnter(ctx);
    return;
  }

  @Action(/delete_work_\d+/)
  async handleDeleteWord(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const wordIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.removeListenWord(
      ctx.session.work,
      wordIndex
    );
    ctx.session.work = result;
    await this.handleWorksList(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
