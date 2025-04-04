import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { JwtRefreshPayload } from '../../../common/types';
import { AuthService } from '../services';
import { User } from '../../user/entities';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _ConfigService: ConfigService,
    private readonly _AuthService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: _ConfigService.getOrThrow<string>('JWT_SECRET'),
      jwtFromRequest: (req: Request) => req.cookies['refresh-token'],
    });
  }
  async validate({ uid: id }: JwtRefreshPayload): Promise<User> {
    const user = await this._AuthService.getOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('USER_NOT_FOUND');
    }

    return user;
  }
}
