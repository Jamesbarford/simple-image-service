import {isMaybe} from "src/utils";

export interface IDatabaseConfig<T> {
    host: string;
    port: number;
    username: string;
    database: string;
    password: string;
    dialect: T;
}

export class DatabaseConfig<T> implements IDatabaseConfig<T> {
    public constructor(
        public readonly host: string,
        public readonly port: number,
        public readonly username: string,
        public readonly database: string,
        public readonly password: string,
        public readonly dialect: T,
    ) {}

    public static builder<T>(): DatabaseConfigBuilder<T> {
        return new DatabaseConfigBuilder();
    }
}

export class DatabaseConfigBuilder<T> {
    private host?: string;
    private port?: number;
    private username?: string;
    private database?: string;
    private password?: string;
    private dialect?: T;

    public withHost(host: string): DatabaseConfigBuilder<T> {
        this.host = host;
        return this;
    }

    public withPort(port: number): DatabaseConfigBuilder<T> {
        this.port = port;
        return this;
    }

    public withUsername(username: string): DatabaseConfigBuilder<T> {
        this.username = username;
        return this;
    }

    public withDatabase(database: string): DatabaseConfigBuilder<T> {
        this.database = database;
        return this;
    }

    public withPassword(password: string): DatabaseConfigBuilder<T> {
        this.password = password;
        return this;
    }

    public withDialect(dialect: T): DatabaseConfigBuilder<T> {
        this.dialect = dialect;
        return this;
    }

    public build(): IDatabaseConfig<T> {
        if (
            [this.host, this.port, this.username, this.password, this.database, this.dialect].some(
                isMaybe,
            )
        ) {
            throw new Error("Missing properties in the DatabaseConfig builder.");
        }

        return new DatabaseConfig(
            <string>this.host,
            <number>this.port,
            <string>this.username,
            <string>this.database,
            <string>this.password,
            <T>this.dialect,
        );
    }
}
