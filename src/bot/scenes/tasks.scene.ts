import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action, Next } from 'nestjs-telegraf';
import {
  TASKS_SCENE,
  TEXTS,
  MENU_BUTTONS,
  BUTTONS,
  COMMANDS,
  AREAS,
  WORKS_SCENE,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';

import { WorksService } from 'src/works/works.service';
import { BotService } from '../bot.service';
import { UsersService } from 'src/users/users.service';

@Scene(TASKS_SCENE)
@UseFilters(BotFilter)
export class TasksScene {
  constructor(
    private readonly worksService: WorksService,
    private readonly botService: BotService,
    private readonly usersService: UsersService
  ) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    try {
      // await this.worksService.deleteAll();
      if (!ctx.session.user) {
        await this.botService.start(ctx);
        return;
      }
      const works = await this.worksService.findByAllByChatId(
        ctx.session.user.chatId
      );
      if (works.length === 0) {
        console.log('works', works);
        ctx.session.addMode = true;
        ctx.session.taskWizardOn = true;
        await ctx.reply(TEXTS.TASKS.MAIN_ADD);
      } else {
        const inlineKeyboard = [];

        works.forEach((work, i) => {
          inlineKeyboard.push([
            { text: `${work.name}`, callback_data: `select_work_${i}` },
          ]);
        });

        inlineKeyboard.push([BUTTONS.ADD_TASK]);
        try {
          const replyMarkup = {
            reply_markup: {
              inline_keyboard: inlineKeyboard,
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          };

          await ctx.reply(TEXTS.TASKS.LIST, replyMarkup);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(COMMANDS.ADD_TASK)
  async handleAddTask(@Ctx() ctx: Context) {
    ctx.session.addMode = true;
    await ctx.reply(TEXTS.TASKS.MAIN_ADD);
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

        this.botService.selectArea(work, ctx);
        return;
      }
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(/select_action_\d+/)
  async handleSelectArea(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const areaIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.setArea(ctx.session.work, areaIndex);
    ctx.session.work = result;
    await ctx.scene.enter(WORKS_SCENE);
    return;
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleBack(@Ctx() ctx: Context) {
    console.log('handleBack');
    await ctx.scene.enter(TASKS_SCENE);
    return;
  }
}
