import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action } from 'nestjs-telegraf';
import {
  CHANNELS_SCENE,
  CHANNELS_ADD_SCENE,
  MENUS,
  TEXTS,
  MENU_BUTTONS,
  TASKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from 'src/bot/bot-navigation.service';

@Scene(CHANNELS_SCENE)
@UseFilters(BotFilter)
export class ChannelsScene {
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
        keyboard: MENUS.CHANNELS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.CHANNELS.MAIN, replyMarkup);

    await this.handleChannelsList(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.CHANNELS_DELETE_ALL.text)
  async handleChannelsDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.OK, MENU_BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.CHANNELS.DELETE, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.CHANNELS_ADD.text)
  async handleChannelsAdd(@Ctx() ctx: Context) {
    await ctx.scene.enter(CHANNELS_ADD_SCENE);
    return;
  }

  // @Hears(MENU_BUTTONS.CHANNELS_LIST.text)
  async handleChannelsList(@Ctx() ctx: Context) {
    const channels = ctx.session.work.muteChannelUsernames;
    const inlineKeyboard = [];

    channels.forEach((channel, i) => {
      inlineKeyboard.push([
        { text: `↩️ ${channel}`, callback_data: `delete_channel_${i}` },
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

      await ctx.reply(TEXTS.CHANNELS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(MENU_BUTTONS.OK.text)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllMuteChannels(
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

  @Action(/delete_channel_\d+/)
  async handleDeleteChannel(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const channelIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.removeMuteChannel(
      ctx.session.work,
      channelIndex
    );
    ctx.session.work = result;
    await this.handleChannelsList(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
