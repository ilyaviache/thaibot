import { Controller, Get } from '@nestjs/common';

@Controller('bot')
export class BotController {
  @Get()
  getBot(): string {
    return 'Hello Bot!';
  }
}
