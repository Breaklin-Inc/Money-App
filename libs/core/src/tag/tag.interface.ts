import {IBaseEntity} from "../common";

export interface ITag<D = string> extends IBaseEntity<D> {
    name: string;
    color?: string;
}