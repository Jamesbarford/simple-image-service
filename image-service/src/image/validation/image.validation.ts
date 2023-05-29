import {FileValidationPipe} from "./image.validation.pipe";
import {validMimeTypes, isValidImageFormat} from "./image.validation.format";

export function fileFormatValidator() {
    return new FileValidationPipe({
        mimeTypes: validMimeTypes,
        isValidFormat: isValidImageFormat,
    });
}
