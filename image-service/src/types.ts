import {AwsCredentials} from "./aws/aws.credentials";
import {DatabaseConfig} from "./database/database.config";

export type Maybe<T> = T | null | undefined;

export type AppConfig = {
    database: DatabaseConfig<"postgres">;
    awsCredentials: AwsCredentials;
};
