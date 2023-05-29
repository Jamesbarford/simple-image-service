import {Inject, Injectable} from "@nestjs/common";
import {isMaybe} from "../utils";
import {CONFIGURATION} from "./constants";
import {Configuration} from "./types";

interface IConfigurationProvider<T extends Record<string, any>> {
    getConfiguration(): Configuration<T>;
}

@Injectable()
export class ConfigurationProvider<T extends Record<string, any>>
    implements IConfigurationProvider<T>
{
    public constructor(@Inject(CONFIGURATION) private configuration: Configuration<T>) {}

    public getConfiguration(): Configuration<T> {
        return this.configuration;
    }

    public get<V>(key: keyof Configuration<T>): V {
        const value = this.configuration?.[key];

        if (isMaybe(value)) {
            throw new Error(`Property: '${String(key)}' missing from configuration`);
        }

        return value;
    }
}
