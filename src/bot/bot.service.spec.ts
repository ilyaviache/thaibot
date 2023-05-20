import { Test } from '@nestjs/testing';
import { BotService } from './bot.service';
import { WorksService } from 'src/works/works.service';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';

describe('BotService', () => {
  let botService: BotService;
  let worksService: WorksService;
  let bot: Telegraf<Context>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BotService,
        WorksService,
        {
          provide: 'BOT_TOKEN', // Замените на фактический токен вашего бота
          useValue: new Telegraf('YOUR_BOT_TOKEN'),
        },
      ],
    }).compile();

    botService = moduleRef.get<BotService>(BotService);
    worksService = moduleRef.get<WorksService>(WorksService);
    bot = moduleRef.get<Telegraf<Context>>('BOT_TOKEN');
  });

  describe('handleListenedMessage', () => {
    it('should handle listened message', async () => {
      const message = { text: 'Test message' };

      // Мокаем вызов worksService.findAll
      jest.spyOn(worksService, 'findAll').mockReturnValue([]);

      const result = await botService.handleListenedMessage(message);

      expect(result).toBeDefined();
      // Добавьте проверки на ожидаемое поведение метода
    });
  });

  describe('start', () => {
    it('should start the bot', async () => {
      const ctx = { reply: jest.fn() };
      const expectedReplyMarkup = {
        reply_markup: {
          keyboard: MENUS.MAIN_MENU,
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      };

      await botService.start(ctx);

      expect(ctx.reply).toHaveBeenCalledWith(
        'Start bot text',
        expectedReplyMarkup
      );
      // Добавьте дополнительные проверки, если необходимо
    });
  });
});
