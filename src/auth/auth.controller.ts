import { Controller, Post, UseGuards, Request, Body, HttpCode } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from '@shared/constants/swagger.const';
import { ApiResponseDto } from '@swagger/dto/api.dto';
import { ResponseDto } from '@swagger/dto/response.dto';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.schema';
import { LoginEntity } from './entities/login.entity';

@ApiTags(SwaggerTags.Auth)
@ApiExtraModels(ResponseDto, LoginEntity)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponseDto(LoginEntity)
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() login: LoginDto,
    @Request() req: { user: User },
  ): Promise<LoginEntity> {
    return this.authService.login(req.user);
  }
}
