import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Action } from 'nestjs-telegraf';
import { TASKS_SCENE, TEXTS } from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(TASKS_SCENE)
@UseFilters(BotFilter)
export class TasksScene {
  constructor(private readonly worksService: WorksService) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    await ctx.reply(TEXTS.TASKS.MAIN_ADD);
    return;
  }
}
