import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { OtpService } from 'src/auth/otp/otp.service';

@Injectable()
export class TasksService {

  constructor(private readonly otpService: OtpService) { }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async runEveryDay() {
    const count = await this.otpService.deleteOutdatedCodes();
    console.log('Every 5 seconds', count);
  }
}