import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action, Next } from 'nestjs-telegraf';
import {
  TASKS_SCENE,
  TEXTS,
  MENU_BUTTONS,
  MENUS,
  COMMANDS,
  WORKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';

import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from '../bot-navigation.service';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from 'src/messages/messages.service';

@Scene(TASKS_SCENE)
@UseFilters(BotFilter)
export class TasksScene {
  constructor(
    private readonly worksService: WorksService,
    private readonly botNavigationService: BotNavigationService,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService
  ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    try {
      if (!ctx.session.user) {
        await this.botNavigationService.start(ctx);
        return;
      }
      const works = await this.worksService.findByAllByChatId(
        ctx.session.user.chatId
      );
      if (works.length === 0) {
        ctx.session.addMode = true;
        ctx.session.taskWizardOn = true;
        await ctx.reply(TEXTS.TASKS.MAIN_ADD);
      } else {
        if (!ctx.session.work) {
          ctx.session.work = works[0];
        }

        const replyMarkup = {
          reply_markup: {
            keyboard: MENUS.TASK_MENU,
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        };

        await ctx.reply(TEXTS.TASKS.SHOW, replyMarkup);
        await this.botNavigationService.showCurrentWorkStats(ctx);
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Hears(RegExp('.'))
  async handleWorkAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    try {
      const word = ctx.update['message']['text'];
      const userId = ctx.update['message']['from']['id'].toString();
      const user = await this.usersService.findByChatId(userId);
      if (
        !ctx.session.addMode ||
        word === MENU_BUTTONS.BACK.text ||
        word === '/start'
      ) {
        return next();
      }
      if (ctx.scene.current.id === TASKS_SCENE) {
        const work = await this.worksService.initNewTaskForUser(user, word);
        ctx.session.addMode = false;
        ctx.session.work = work;
        ctx.session.user = user;

        await this.botNavigationService.selectArea(work, ctx);
        return;
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(/select_area_\d+/)
  async handleSelectArea(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const id = Number(callbackData.split('_')[2]);

    const result = await this.worksService.setArea(ctx.session.work, id);
    ctx.session.work = result;
    await this.botNavigationService.selectPreset(ctx);
    return;
  }

  @Action(/select_preset_\d+/)
  async handleSelectPreset(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const id = Number(callbackData.split('_')[2]);

    const work = await this.worksService.setPreset(ctx.session.work, id);
    ctx.session.work = work;
    const inlineKeyboard = [
      [{ text: work.name, callback_data: 'open_work_scene' }],
    ];

    const replyMarkup = {
      reply_markup: {
        inline_keyboard: inlineKeyboard,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.TASKS.CREATED, replyMarkup);
  }

  @Action(/show_messages_\d+/)
  async handleShowMessages(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const limit = Number(callbackData.split('_')[2]) || 10;

    const messages = await this.messagesService.findAllByWorkId(ctx.session.work.id, limit);
    // show all messages to user in reply
    for (let message of messages) {
      const formattedDate = format(message.createdAt, "d MMMM 'в' HH:mm", { locale: ru });
      const escapeChars = (str: string) => str.replace(/[-_.!*()]/g, '\\$&'); // Экранирование специальных символов
      const reply = `
        [Отправлено ${escapeChars(formattedDate)}](https://t\\.me/${escapeChars(message.channelUsername)}/${message.messageId})
      `
      await ctx.sendMessage(reply, { parse_mode: 'MarkdownV2' });
    }

    return;
  }

  @Action('open_work_scene')
  async handleOpenWorkScene(@Ctx() ctx: Context) {
    await this.onSceneEnter(ctx);
    return;
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleBack(@Ctx() ctx: Context) {
    console.log('handleBack');
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
