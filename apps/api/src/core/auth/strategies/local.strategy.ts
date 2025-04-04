import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly _AuthService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const foundUser = await this._AuthService.verifyCredentials({
      email,
      password,
    });

    return foundUser;
  }
}
