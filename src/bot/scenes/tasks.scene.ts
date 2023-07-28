import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action, Next } from 'nestjs-telegraf';
import { TASKS_SCENE, TEXTS, MENU_BUTTONS } from '../bot.constants';
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
        console.log('work', work);
        // ctx.session.work = work;
      }
    } catch (e) {
      console.log(e);
    }
    return;
    // if (ctx.scene.current.id === WORKS_ADD_SCENE) {
    //   const word = ctx.update['message']['text'];
    //   if (word === MENU_BUTTONS.BACK.text || word === '/start') {
    //     return next();
    //   }
    //   try {
    //     const result = await this.worksService.addListenWord(
    //       ctx.session.work,
    //       word
    //     );

    //     ctx.session.work = result;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    //   return next();
    // }

    // await this.onSceneEnter(ctx);
    // return;
  }
}
