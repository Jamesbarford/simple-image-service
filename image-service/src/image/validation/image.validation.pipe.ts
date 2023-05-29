import {FileValidator} from "@nestjs/common";
import {FileFormatValidator} from "./types";

interface FileValidators {
    mimeTypes: Set<string>;
    isValidFormat: FileFormatValidator;
}

export class FileValidationPipe extends FileValidator<FileValidators> {
    public constructor(protected readonly validationOptions: FileValidators) {
        super(validationOptions);
    }

    public isValid(file: Express.Multer.File): boolean {
        const fileExtension = file.mimetype.toLowerCase().split("/")[1];
        return (
            this.validationOptions.mimeTypes.has(fileExtension) &&
            this.validationOptions.isValidFormat(file)
        );
    }

    public buildErrorMessage(file: Express.Multer.File): string {
        const fileExtension = file.mimetype.toLowerCase().split("/")[1];
        const isValidMimeType = this.validationOptions.mimeTypes.has(fileExtension);

        if (!isValidMimeType) {
            return `File has invalid file type expected one of ${Array.from(
                this.validationOptions.mimeTypes,
            ).join(", ")}`;
        }

        console.log(file.buffer);

        return "File has invalid format";
    }
}
