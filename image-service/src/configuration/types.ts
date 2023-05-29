import {ModuleMetadata, ValueProvider, DynamicModule} from "@nestjs/common";

type ModuleAsyncOptionsBase = Pick<DynamicModule, "global"> &
    Pick<ModuleMetadata, "imports" | "providers">;

type ValueModuleAsyncOptions<T> = Pick<ValueProvider<T>, "useValue">;

export interface IValueModuleAsyncOptions<T>
    extends ModuleAsyncOptionsBase,
        ValueModuleAsyncOptions<T> {}

export type Configuration<T extends Record<string, any>> = {
    [K in keyof T]: T[K];
};
