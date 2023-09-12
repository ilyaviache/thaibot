import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Module({
  imports: [],
  providers: [MessagesService],
})
export class MessagesModule {}
