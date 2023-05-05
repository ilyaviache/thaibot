import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { OtpService } from './otp/otp.service';
import { UsersService } from 'src/users/users.service';

// TODO: move to .env
export const jwtSecret = 'db1e3a04e028eeec1b0c4af5f53fccb8';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, OtpService, UsersService],
  exports: [AuthService, OtpService],
})
export class AuthModule { }
