import { ISignUpBodyReq } from '@Breaklin-Inc/external';
import { IsSame, StringValidator } from '../../../common/validation';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpBodyReqDto implements ISignUpBodyReq {
  @IsSame<ISignUpBodyReq>('password', { message: "Passwords don't match" })
  @StringValidator
  password2: string;
  @StringValidator
  firstName: string;
  @StringValidator
  lastName: string;
  @StringValidator
  username: string;
  @IsEmail()
  @StringValidator
  email: string;
  @IsStrongPassword()
  @StringValidator
  password: string;
}
