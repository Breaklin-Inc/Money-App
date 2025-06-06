import {Injectable} from "@nestjs/common";
import {DataSource, Repository} from "typeorm";
import {User} from "../entities";

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private readonly dataSource: DataSource ) {
        super(User, dataSource.createEntityManager())
    }
}