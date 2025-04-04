import { ILogInBodyReq, ILogInBodyRes } from '@Breaklin-Inc/external';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LogInBodyReqDto implements ILogInBodyReq {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LogInBodyResDto implements ILogInBodyRes {
  email: string;
  username: string;
  accessToken: string;
}
