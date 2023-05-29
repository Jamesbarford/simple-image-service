import {AwsCredentials} from "./aws/aws.credentials";
import {DatabaseConfig} from "./database/database.config";
import {getenv} from "./utils";

export type ApplicationConfig = {
    database: DatabaseConfig<"postgres">;
    awsCredentials: AwsCredentials;
};

export function createConfig(): ApplicationConfig {
    const databaseConfig = DatabaseConfig.builder<"postgres">()
        .withHost(getenv("DATABASE_HOST"))
        .withPort(+getenv("DATABASE_PORT"))
        .withDialect("postgres")
        .withPassword(getenv("DATABASE_PASSWORD", ""))
        .withUsername(getenv("DATABASE_USERNAME"))
        .withDatabase(getenv("DATABASE_NAME"))
        .build();

    const awsCredentials = AwsCredentials.builder()
        .withRegion(getenv("AWS_REGION"))
        .withAccessKeyId(getenv("AWS_ACCESS_KEY_ID"))
        .withSecretAccessKey(getenv("AWS_SECRET_ACCESS_KEY"))
        .withBucketRegion(getenv("AWS_BUCKET_REGION"))
        .withBucketName(getenv("AWS_IMAGE_BUCKET_NAME"))
        .build();

    return {
        database: databaseConfig,
        awsCredentials,
    };
}
