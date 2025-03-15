import {Column, Entity, OneToMany} from "typeorm";
import {CommonEntity} from "../../../common/entities";
import {ICategory} from "@Breaklin-Inc/core/dist/category";
import {Transaction} from "../../transaction/entities";

@Entity()
export class Category extends CommonEntity implements ICategory<Date> {
    @Column()
    name: string;

    @Column({nullable: true})
    color?: string;

    @Column({nullable: true})
    icon?: string;

    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions?: Transaction[]
}