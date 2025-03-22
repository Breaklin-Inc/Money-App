import {IBaseEntity} from "../common";
export interface IBaseUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface IUser<D = string> extends IBaseUser, IBaseEntity<D> {}