import {Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/sequelize";
import {Sequelize, Transaction} from "sequelize";

@Injectable()
export class DatabaseTransactionRunner {
    public constructor(
        @InjectConnection()
        private readonly sequelize: Sequelize,
    ) {}

    public async auto(transction: (t: Transaction) => Promise<void>) {
        return this.sequelize.transaction(transction);
    }

    public async create(): Promise<Transaction> {
        return this.sequelize.transaction();
    }
}
