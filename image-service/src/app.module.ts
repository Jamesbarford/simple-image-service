import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {createConfig} from "./config";
import {ConfigurationModule} from "./configuration/configuration.module";
import {ConfigurationProvider} from "./configuration/configuration.provider";
import {AppConfig} from "./types";
import {DatabaseConfig} from "./database/database.config";
import {ImageModule} from "./image/image.module";
import {ImageBucketModule} from "./image/bucket/image.bucket.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "public"),
            serveRoot: "/"
        }),
        ConfigurationModule.forRootAsync<AppConfig>({
            global: true,
            useValue: createConfig(),
        }),
        SequelizeModule.forRootAsync({
            useFactory: (args: ConfigurationProvider<AppConfig>) => {
                const d = args.get<DatabaseConfig<"postgres">>("database");
                return {
                    dialect: d.dialect,
                    host: d.host,
                    port: d.port,
                    username: d.username,
                    password: d.password,
                    database: d.database,
                    autoLoadModels: true,
                };
            },
            inject: [ConfigurationProvider],
        }),
        ImageBucketModule,
        ImageModule,
    ],
})
export class AppModule {}
