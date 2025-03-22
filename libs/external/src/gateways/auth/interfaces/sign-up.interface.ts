import {IBaseUser} from "@Breaklin-Inc/core";

export interface ISignUpBodyReq extends IBaseUser {
    password2: string;
}