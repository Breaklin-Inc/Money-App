import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services';
import { LocalUser } from '../decorators';
import { LocalGuard } from '../guards';
import { User } from '../../user/entities';
import { SignUpBodyReqDto } from '../dto';
import { ILogInReturn } from '../services/types';
import { LogInResponseInterceptor } from '../interceptors';
import { IRefreshTokenBodyRes } from '@Breaklin-Inc/external';
import { Transactional } from 'typeorm-transactional';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}
  @Post('log-in')
  @UseGuards(LocalGuard)
  @UseInterceptors(LogInResponseInterceptor)
  async logIn(@LocalUser() user: User) {
    const tokens = await this._AuthService.logIn(user);

    return { ...tokens, user };
  }

  @Post('sign-up')
  @UseInterceptors(LogInResponseInterceptor)
  @Transactional()
  async signUp(@Body() body: SignUpBodyReqDto): Promise<ILogInReturn> {
    return this._AuthService.signUp(body);
  }

  @Post('refresh-token')
  async refreshToken(@LocalUser() user: User): Promise<IRefreshTokenBodyRes> {
    return this._AuthService.refreshToken(user);
  }
}
