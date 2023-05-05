import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany({})
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    return user
  }
}
