import { Currency, ITransaction, TransactionType } from '@Breaklin-Inc/core';
import { CommonEntity } from '../../../common/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities';

@Entity()
export class Transaction extends CommonEntity implements ITransaction<Date> {
  @Column()
  accountId: string;

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ type: 'timestamptz' })
  date: string;

  @Column({ type: 'enum', enum: TransactionType })
  operation: TransactionType;

  @Column({ nullable: true })
  note?: string;

  @ManyToOne(() => Category, (category) => category.transactions, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ nullable: true, name: 'category_id' })
  categoryId?: string;
}
