import { Auth } from './entity/auth.entity';
import { compare, genSalt, hash } from 'bcryptjs';
import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from './otp/otp.service';
import { OtpEntity } from './otp/otp.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) { }

  async sendCode(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const code = await this.otpService.create(user);

    return code;
  }

  async login(email: string, code: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const otp = await this.otpService.getLatestCodeForUser(user);
    if (!otp) {
      throw new NotFoundException(`No code found for the user: ${email}`);
    }

    const codeValid = await this.otpService.validateCode(otp, code);

    if (!codeValid) {
      throw new UnauthorizedException('Invalid code');
    }

    // purge codes after user login
    this.otpService.deleteCodesForUser(user);

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: createUserDto })
    await this.otpService.create(user);

    return user;
  }

  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  protected async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }
}
