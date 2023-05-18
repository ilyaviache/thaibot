import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

@Module({
  providers: [WorksService],
  controllers: [WorksController]
})
export class WorksModule {}
