import { Delete } from '@nestjs/common';
import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { CreateUserDto } from './model/create-user-dto.model';
import { GetUserParamDto } from './model/get-user-dto.model';

@Controller('user')
export class UserController {
  @Get(':id')
  public getUser(@Param() params: GetUserParamDto) {
    return 'return user id';
  }
}
