import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../../common/entities';
import { Currency, IAccount } from '@Breaklin-Inc/core';
import { User } from '../../user/entities';

@Entity()
export class Account extends CommonEntity implements IAccount<Date> {
  @Column({ type: 'float' })
  balance: number;

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column()
  name: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.accounts)
  @JoinColumn({ name: 'user_id' })
  user?: User;
}
