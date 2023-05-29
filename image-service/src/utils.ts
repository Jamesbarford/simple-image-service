import {Maybe} from "./types";

export function getenv(key: string, fallback?: string): string {
    const value = process.env[key];

    if (!value && !isMaybe(fallback)) {
        return fallback;
    }

    if (!value) {
        throw new Error(`ENVIRONMENT VARIABLE: '${key}' missing`);
    }

    return value;
}

export function isMaybe<T>(argv?: Maybe<T>): argv is null | undefined {
    return argv === null || argv === undefined;
}
