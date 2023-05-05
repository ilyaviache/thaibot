import { Module } from '@nestjs/common';
import { OtpService } from 'src/auth/otp/otp.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  providers: [TasksService, OtpService],
  exports: [TasksService],
})
export class TasksModule { }
