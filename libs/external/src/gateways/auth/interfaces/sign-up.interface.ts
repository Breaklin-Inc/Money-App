import {IBaseUser} from "@Breaklin-Inc/core";
import {ILogInBodyRes} from "./log-in.interface";

export interface ISignUpBodyReq extends IBaseUser {
    password2: string;
}

export interface ISignUpBodyRes extends ILogInBodyRes {}