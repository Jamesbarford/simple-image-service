import {DynamicModule, Module} from "@nestjs/common";
import {ConfigurationProvider} from "./configuration.provider";
import {CONFIGURATION} from "./constants";
import {IValueModuleAsyncOptions} from "./types";

@Module({})
export class ConfigurationModule {
    static async forRootAsync<T>(options: IValueModuleAsyncOptions<T>): Promise<DynamicModule> {
        const {global, imports, providers} = options;

        return {
            global,
            module: ConfigurationModule,
            imports: [...(imports || [])],
            providers: [
                ...(providers || []),
                {
                    provide: CONFIGURATION,
                    useFactory: async () => {
                        return options.useValue;
                    },
                },
                ConfigurationProvider,
            ],
            exports: [ConfigurationProvider],
        };
    }
}
