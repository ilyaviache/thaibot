import { Module, Global } from '@nestjs/common';

import { MailService } from './mail/mail.service';

@Global()
@Module({
  providers: [MailService],
  exports: [MailService]
})

export class SharedModule { }
