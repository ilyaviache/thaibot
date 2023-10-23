import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { SettingsService } from './settings.service';

@Global()
@Module({
  providers: [SettingsService, PrismaService],
  exports: [SettingsService],
})
export class SettingsModule {}
