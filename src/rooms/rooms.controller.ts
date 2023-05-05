import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/decoratos/user.decorator';

@Controller('user/rooms')
@ApiTags('user/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RoomEntity })
  create(@Body() createRoomDto: CreateRoomDto, @User() user) {
    return this.roomsService.create(createRoomDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [RoomEntity] })
  findAll(@Query() connectionArgs: ConnectionArgs, @User() user) {
    return this.roomsService.findAll(connectionArgs, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: RoomEntity })
  findOne(@Param('id') id: string, @User() user) {
    return this.roomsService.findOne(id, user);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: RoomEntity })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto, @User() user) {
    return this.roomsService.update(id, updateRoomDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: RoomEntity })
  remove(@Param('id') id: string, @User() user) {
    return this.roomsService.remove(id, user);
  }
}
