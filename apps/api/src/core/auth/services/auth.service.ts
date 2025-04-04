import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services';
import {
  ILogInBodyReq,
  IRefreshTokenBodyRes,
  ISignUpBodyReq,
} from '@Breaklin-Inc/external';
import { hash, compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CryptoUtils } from '../../../common/utils/Crypto.utils';
import { ILogInParams, ILogInReturn } from './types';
import { IUser } from '@Breaklin-Inc/core';
import { JwtPayload, JwtRefreshPayload } from '../../../common/types';
import { User } from '../../user/entities';
import { FindOptionsWhere } from 'typeorm';
import { ISignUpReturn } from './types/sign-up.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly _UserService: UserService,
    private readonly _ConfigService: ConfigService,
    private readonly _JwtService: JwtService,
  ) {}
  async verifyCredentials({
    email,
    password,
  }: ILogInBodyReq): Promise<IUser<Date>> {
    const foundUser = await this._UserService.getOneBy({ email });
    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const correctPassword = await compare(password, foundUser.password);
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
  async logIn({ email, id }: ILogInParams): Promise<ILogInReturn> {
    const accessToken = await this.signToken<JwtPayload>({ email, uid: id });
    const refreshToken = await this.signToken<JwtRefreshPayload>(
      {
        uid: id,
        tokenId: CryptoUtils.generateSecret(),
      },
      '7d',
    );
    return { accessToken, refreshToken } as const;
  }

  async signUp({ password2, ...body }: ISignUpBodyReq): Promise<ISignUpReturn> {
    const { email, password } = body;
    const existingUser = await this._UserService.getOneBy({ email });
    if (existingUser) {
      throw new ConflictException('EMAIL_IN_USE');
    }

    const newUser = await this._UserService.create({
      ...body,
      password: await hash(
        password,
        +this._ConfigService.get<string>('SALT_ROUNDS'),
      ),
    });

    const tokens = await this.logIn(newUser);

    return { ...newUser, ...tokens };
  }

  async refreshToken({ email, id: uid }: User): Promise<IRefreshTokenBodyRes> {
    const accessToken = await this.signToken<JwtPayload>({ email, uid });
    return { accessToken };
  }
  async getOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this._UserService.getOneBy(where);
  }
  private async signToken<P extends Record<string, any>>(
    payload: P,
    expiresIn?: JwtSignOptions['expiresIn'],
  ): Promise<string> {
    return this._JwtService.signAsync(payload, expiresIn ? { expiresIn } : {});
  }
}
