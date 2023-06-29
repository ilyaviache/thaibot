import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Action } from 'nestjs-telegraf';
import { AREA_SCENE, AREAS, TEXTS, MENU_BUTTONS } from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';
import { BotService } from '../bot.service';

@Scene(AREA_SCENE)
@UseFilters(BotFilter)
export class AreaScene {
  constructor(
    private readonly worksService: WorksService,
    private readonly botService: BotService
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const inlineKeyboard = [];
    const work = ctx.session.work;

    const renderAreaButton = (area, i) => {
      if (work && work.selectedChatsId && work.selectedChatsId === area.id) {
        return { text: `✅ ${area.name}`, callback_data: `select_area_${i}` };
      } else {
        return { text: `${area.name}`, callback_data: `select_area_${i}` };
      }
    };

    AREAS.forEach((area, i) => {
      inlineKeyboard.push([renderAreaButton(area, i)]);
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

      await ctx.reply(TEXTS.AREA.LIST, replyMarkup);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  @Action(/select_area_\d+/)
  async handleSelectArea(@Ctx() ctx: Context) {
    const callbackData = ctx.callbackQuery['data'];
    const areaIndex = Number(callbackData.split('_')[2]);

    const result = await this.worksService.setArea(ctx.session.work, areaIndex);
    ctx.session.work = result;
    await await this.onSceneEnter(ctx);
  }

  @Action(MENU_BUTTONS.BACK.callback_data)
  async handleBackButton(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
    return;
  }
}
