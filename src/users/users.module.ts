import { Module } from '@nestjs/common';
// import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService],
})
export class UsersModule {}
