import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ServerClient, TemplatedMessage } from 'postmark';
import { UserEntity } from '../../users/entity/user.entity';

const DEFAULT_FROM = 'tech@immerse.digital'
const OTP_TEMPLATE = 'otp-code'
const PRODUCT_NAME = 'NFT Viewer'

@Injectable()
export class MailService {
  private readonly logger = new Logger('Mailervice');

  client: ServerClient

  constructor() {
    // TODO: move api key to configs
    // console.log('postmark', postmark)
    this.client = new ServerClient('672872fa-1d48-4f7b-97d0-27d5de413cd2')
  }

  test(): ServerClient {
    return this.client;
  }

  async send(to = 'test@email.com', templateName: string, templateModel: object) {
    try {
      const from = DEFAULT_FROM

      const options: TemplatedMessage = {
        From: from,
        To: to,
        TemplateAlias: templateName,
        TemplateModel: templateModel,
        TrackOpens: false,
      }

      // console.log('sending:', options)
      const response = await this.client.sendEmailWithTemplate(options)
      return response
    } catch (e) {
      throw new InternalServerErrorException(`Can't send email to ${to}`)
    }
  }

  async sendOTPCodeToUser(user: UserEntity, code: string) {
    const model = {
      action_url: '/',
      product_name: PRODUCT_NAME,
      username: user.username,
      code: code || '123456',
    }
    await this.send(user.email, OTP_TEMPLATE, model)
  }
}
