import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action, Next } from 'nestjs-telegraf';
import {
  CHANNELS_SCENE,
  CHANNELS_ADD_SCENE,
  MENU_BUTTONS,
  BUTTONS,
  TASKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from 'src/bot/bot-navigation.service';
import { SettingsService } from 'src/settings/settings.service';

@Scene(CHANNELS_SCENE)
@UseFilters(BotFilter)
export class ChannelsScene {
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
        keyboard: this.settingsService.MENUS().CHANNELS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().CHANNELS.MAIN, replyMarkup);

    await this.handleChannelsList(ctx);
    return;
  }

  @Hears(MENU_BUTTONS.CHANNELS_DELETE_ALL.text)
  async handleChannelsDelete(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        inline_keyboard: [[BUTTONS.OK, BUTTONS.CANCEL]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(this.settingsService.TEXTS().CHANNELS.DELETE, replyMarkup);
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

      await ctx.reply(this.settingsService.TEXTS().CHANNELS.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(BUTTONS.OK.callback_data)
  async handleOk(@Ctx() ctx: Context) {
    const result = await this.worksService.removeAllMuteChannels(
      ctx.session.work
    );
    ctx.session.work = result;
    await this.onSceneEnter(ctx);
    return;
  }

  @Action(BUTTONS.CANCEL.callback_data)
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

  @Hears(RegExp('.'))
  async handleChannelAdd(
    @Ctx() ctx: Context,
    @Next() next: () => Promise<void>
  ) {
    await this.botNavigationService.handleChannelAdd(ctx, next);
    await this.onSceneEnter(ctx);
    return;
  }
}
