import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerTags } from '@shared/constants/swagger.const';

import { LocalAuthenticationGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginEntity } from './entities/login.entity';
import { RequestWithUser } from './model/request-with-user.model';
import { User } from 'users/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags(SwaggerTags.Auth)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() request: RequestWithUser): Promise<User> {
    const { user } = request;
    const { _id, username } = user;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken({
      id: _id.toString(),
      username,
    });
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken({
        id: _id.toString(),
        username,
      });

    await this.authService.setCurrentRefreshToken(
      refreshTokenCookie,
      _id.toString(),
    );

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }


  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logOut(@Request() request: RequestWithUser) {
    await this.authService.removeRefreshToken(request.user._id.toString());
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
