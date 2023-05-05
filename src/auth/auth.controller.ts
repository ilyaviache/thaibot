import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { SendCodeDto } from './dto/sendCode.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { MailService } from 'src/shared/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) { }

  @Post('sendCode')
  @ApiOkResponse()
  async sendCode(@Body() { email }: SendCodeDto) {
    const user = await this.usersService.findByEmail(email)
    const code = await this.authService.sendCode(user.email);
    await this.mailService.sendOTPCodeToUser(user, code)
    return { message: 'ok', code }
  }

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(@Body() { email, code }: LoginDto) {
    // return this.authService.sendCode(email);
    return this.authService.login(email, code);
  }

  @Post('register')
  @ApiCreatedResponse({ type: UserEntity })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto)
    const code = await this.authService.sendCode(user.email);
    await this.mailService.sendOTPCodeToUser(user, code)
    return user;
  }
}
