import {IBaseEntity} from "../common";

export interface ICategory<D = string> extends IBaseEntity<D> {
    name: string;
    color?: string;
    icon?: string;
}