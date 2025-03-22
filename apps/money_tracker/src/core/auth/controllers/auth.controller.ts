import { Controller, Post, UseGuards, Res, Body } from '@nestjs/common';
import { AuthService } from '../services';
import { LocalUser } from '../decorators';
import { LocalGuard } from '../guards';
import { User } from '../../user/entities';
import { Response } from 'express';
import { SignUpBodyReqDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}
  @Post('log-in')
  @UseGuards(LocalGuard)
  async logIn(@LocalUser() user: User, @Res() res: Response) {
    const { accessToken, refreshToken } = await this._AuthService.logIn(user);
    res
      .cookie('refresh-token', refreshToken)
      .json({ accessToken, email: user.email, username: user.username });
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpBodyReqDto) {
    const r = await this._AuthService.signUp(body);
  }
}
