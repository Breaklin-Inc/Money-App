import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../../../common/entities';
import { IUser } from '@Breaklin-Inc/core';
import { Account } from '../../account/entities';

@Entity()
export class User extends CommonEntity implements IUser<Date> {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts?: Account[];
}
