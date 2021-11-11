import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { GetUserDto } from './dto/get-user-dto.model';

@Controller('user')
export class UserController {
  public constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUser(@Request() req: { user: User }): Promise<GetUserDto> {
    const { user } = req;
    return {
      email: user.username,
      avatar: user.avatar,
      firstName: user.firstname,
      lastName: user.lastname,
    };
  }
}
