import { UseFilters } from '@nestjs/common';
import { Scene, SceneEnter, Ctx, Hears, Next } from 'nestjs-telegraf';
import {
  WORKS_SCENE,
  WORKS_ADD_SCENE,
  TEXTS,
  MENU_BUTTONS,
} from '../bot.constants';
import { BotFilter } from '../bot.filter';
import { Context } from '../bot.interface';
import { WorksService } from 'src/works/works.service';

@Scene(WORKS_ADD_SCENE)
@UseFilters(BotFilter)
export class WorksAddScene {
  constructor(private readonly worksService: WorksService) {}
  @SceneEnter()
  async onSceneEnter(@Ctx() ctx: Context) {
    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply(TEXTS.WORKS.ADD, replyMarkup);
    return;
  }

  @Hears(MENU_BUTTONS.BACK.text)
  async handleDeleteCancel(@Ctx() ctx: Context) {
    await ctx.scene.enter(WORKS_SCENE);
  }

  @Hears(RegExp('.'))
  async handleWorkAdd(@Ctx() ctx: Context, @Next() next: () => Promise<void>) {
    console.log('handleWorkAdd', ctx.scene.current.id);
    if (ctx.scene.current.id === WORKS_ADD_SCENE) {
      const inputText = ctx.update['message']['text'];

      if (inputText === MENU_BUTTONS.BACK.text || inputText === '/start') {
        return next();
      }

      // Разделите строку на слова, используя запятую в качестве разделителя.
      const words = inputText.split(',').map(word => word.trim()).filter(word => word);

      for (const word of words) {
        try {
          const result = await this.worksService.addListenWord(
            ctx.session.work,
            word
          );

          ctx.session.work = result;
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      return next();
    }

    const replyMarkup = {
      reply_markup: {
        keyboard: [[MENU_BUTTONS.BACK]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    await ctx.reply('✅', replyMarkup);
    return;
  }

}
