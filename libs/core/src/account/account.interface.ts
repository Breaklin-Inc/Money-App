import {Currency, IBaseEntity} from "../common";

export interface IBaseAccount {
    name: string;
    balance: number;
    currency: Currency;
}
export interface IAccount<D = string> extends IBaseAccount, IBaseEntity<D> {
    userId: string;

}