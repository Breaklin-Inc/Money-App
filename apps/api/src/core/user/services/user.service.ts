import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { AbstractService } from '../../../common/services';
import { User } from '../entities';
import { ISignUpBodyReq } from '@Breaklin-Inc/external';
import { IUser } from '@Breaklin-Inc/core';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(private readonly _UserRepository: UserRepository) {
    super(_UserRepository);
  }
  async getOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.findOneBy(where);
  }
  async create(body: Omit<ISignUpBodyReq, 'password2'>): Promise<IUser<Date>> {
    return this._UserRepository.save(body);
  }
}
