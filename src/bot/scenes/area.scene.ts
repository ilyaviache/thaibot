import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { AREA_SCENE, AREAS, TEXTS, MENU_BUTTONS } from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotNavigationService } from '../bot-navigation.service';

@Scene(AREA_SCENE)
@UseFilters(BotFilter)
export class AreaScene {
  constructor(
    private readonly worksService: WorksService,
    private readonly botNavigationService: BotNavigationService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const work = ctx.session.work;
    try {
      await this.botNavigationService.selectArea(work, ctx);
    } catch (error) {
      console.log(error);
    }
    return;
  }

  @Action(/select_area_\d+/)
  async handleSelectArea(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const areaIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.setArea(ctx.session.work, areaIndex);
    ctx.session.work = result;
    await this.onSceneEnter(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleBackButton(@Ctx() ctx: Context) {
    await this.botNavigationService.start(ctx);
    return;
  }
}
