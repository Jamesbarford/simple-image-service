import {FileFormatValidator} from "./types";

export const validMimeTypes = new Set<string>(["jpeg", "jpg"]);

export function isJpeg(file: Express.Multer.File): boolean {
    const buf = file.buffer;
    return buf[0] === 0xff && buf[1] == 0xd8 && buf[2] == 0xff;
}

export function makeFileFormatValidators(...funcs: FileFormatValidator[]): FileFormatValidator {
    return (file) => {
        for (const func of funcs) {
            if (!func(file)) {
                return false;
            }
        }
        return true;
    };
}

export const isValidImageFormat: FileFormatValidator = makeFileFormatValidators(isJpeg);
