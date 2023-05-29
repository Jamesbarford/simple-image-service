import {IsNotEmpty, IsString} from "class-validator";

export class ImageCreateDto {
    @IsNotEmpty()
    public readonly file: Express.Multer.File;

    @IsString()
    public readonly name: string;
}
