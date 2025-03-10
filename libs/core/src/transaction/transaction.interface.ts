import {Currency, IBaseEntity} from "../common";
import {TransactionType} from "./transaction-type.enum";

export interface IBaseTransaction<D = string> {
    note?: string;
    operation: TransactionType;
    date: D;
    currency: Currency;
}
export interface ITransaction<D = string> extends IBaseTransaction, IBaseEntity<D> {
    categoryId?: string;
    accountId: string;
}