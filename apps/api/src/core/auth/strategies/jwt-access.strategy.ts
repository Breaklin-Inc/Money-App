import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../../common/types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _ConfigService.getOrThrow<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  validate(
    payload: JwtPayload,
  ): Promise<false | unknown | null> | false | unknown | null {
    return payload;
  }
}
