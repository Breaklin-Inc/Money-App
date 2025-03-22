import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services';
import { ILogInBodyReq, ISignUpBodyReq } from '@Breaklin-Inc/external';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CryptoUtils } from '../../../common/utils/Crypto.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly _UserService: UserService,
    private readonly _ConfigService: ConfigService,
    private readonly _JwtService: JwtService,
  ) {}
  async verifyCredentials({ email, password }: ILogInBodyReq): Promise<User> {
    const foundUser = await this._UserService.getByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const correctPassword = await compare(password, foundUser.password);
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
  async logIn({ username, email, id }: User) {
    const accessToken = await this.signToken({ email, uid: id, username });
    const refreshToken = await this.signToken(
      {
        uid: id,
        tokenId: CryptoUtils.generateSecret(),
      },
      '7d',
    );
    return { accessToken, refreshToken } as const;
  }

  async signUp({ password2, ...body }: ISignUpBodyReq) {
    const { email, password } = body;
    const existingUser = await this._UserService.getByEmail(email);
    if (existingUser) {
      throw new ConflictException('EMAIL_IN_USE');
    }
    const newUser = await this._UserService.create({
      ...body,
      password: await hash(
        password,
        this._ConfigService.get<string>('SALT_ROUNDS'),
      ),
    });

    return this.logIn(newUser);
  }
  private async signToken(
    payload: Record<string, any>,
    expiration?: JwtSignOptions['expiresIn'],
  ): Promise<string> {
    return this._JwtService.signAsync(payload, { expiresIn: expiration });
  }
}
