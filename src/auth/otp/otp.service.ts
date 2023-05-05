import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as moment from 'moment';
import { genSalt, hash, compare } from 'bcryptjs';

import { PrismaService } from 'src/prisma/prisma.service';
import { OtpEntity } from './otp.entity';
import { UserEntity } from 'src/users/entity/user.entity';

const OTP_DIGITS = '0123456789'

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(private prisma: PrismaService) { }

  async create(user: UserEntity) {
    const code = this.generateOTPCode();
    const salt = await genSalt(12);
    const hashedCode = await hash(code, salt);

    const data: OtpEntity = new OtpEntity({
      expiresAt: moment().add(1, 'hours').toDate(),
      hashedCode,
      userId: user.id,
    });

    const otp = await this.prisma.otp.create({ data });

    if (!otp) {
      throw new InternalServerErrorException('Error while creating otp code');
    }

    return code;
  }

  async getLatestCodeForUser(user: UserEntity) {
    return this.prisma.otp.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deleteCodesForUser(user: UserEntity) {
    return this.prisma.otp.deleteMany({
      where: {
        userId: user.id
      }
    })
  }

  async deleteOutdatedCodes() {
    return this.prisma.otp.deleteMany({
      where: {
        expiresAt: {
          lt: moment().toDate()
        },
      }
    })
  }

  async validateCode(otp: OtpEntity, code: string): Promise<boolean> {
    const codeValid = await compare(code, otp.hashedCode);
    const codeNotExpired = moment().isBefore(moment(otp.expiresAt).format());
    return codeValid && codeNotExpired;
  }

  private generateOTPCode(otpLength = 6) {
    let otp = '';
    for (let i = 1; i <= otpLength; i++) {
      const index = Math.floor(Math.random() * (OTP_DIGITS.length));
      otp = otp + OTP_DIGITS[index];
    }

    return otp;
  }
}
