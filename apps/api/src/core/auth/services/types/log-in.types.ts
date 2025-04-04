import { IUser } from '@Breaklin-Inc/core';

export interface ILogInParams extends IUser<Date> {}
export interface ILogInReturn {
  accessToken: string;
  refreshToken: string;
}
