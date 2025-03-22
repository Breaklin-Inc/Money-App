import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommonEntity } from '../entities';

@Injectable()
export class AbstractService<T extends CommonEntity> {
  constructor(private readonly _Repository: Repository<T>) {}
  protected async getOneBy(criteria: FindOptionsWhere<T>) {
    return this._Repository.findOneBy(criteria);
  }
}
