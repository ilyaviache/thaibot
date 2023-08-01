import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action } from 'nestjs-telegraf';
import {
  ACCOUNTS_SCENE,
  ACCOUNTS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
  TASKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(ACCOUNTS_SCENE)
@UseFilters(BotFilter)
export class AccountsScene {
  constructor(private readonly worksService: WorksService) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.ACCOUNTS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.ACCOUNTS.MAIN, replyMarkup);

    await this.handleAccountsList(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.ACCOUNTS_DELETE_ALL.text)
  async handleAccountsDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.OK, MENU_BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.ACCOUNTS.DELETE, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.ACCOUNTS_ADD.text)
  async handleAccountsAdd(@Ctx() ctx: Context) {
    await ctx.scene.enter(ACCOUNTS_ADD_SCENE);
    return;
  }

  @Hears(MENU_BUTTONS.ACCOUNTS_LIST.text)
  async handleAccountsList(@Ctx() ctx: Context) {
    const accounts = ctx.session.work.muteUsernames;
    const inlineKeyboard = [];

    accounts.forEach((account, i) => {
      inlineKeyboard.push([
        { text: `↩️ ${account}`, callback_data: `delete_account_${i}` },
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

      await ctx.reply(TEXTS.ACCOUNTS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(MENU_BUTTONS.OK.text)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllMuteAccounts(
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

  @Action(/delete_account_\d+/)
  async handleDeleteAccount(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const accountIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.removeMuteAccount(
      ctx.session.work,
      accountIndex
    );
    ctx.session.work = result;
    await this.handleAccountsList(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
