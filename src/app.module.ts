import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SharedModule,
    PrismaModule,
    RoomsModule,
    AuthModule,
    UsersModule,
    TasksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
