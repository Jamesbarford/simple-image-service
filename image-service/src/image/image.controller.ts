import {
    BadRequestException,
    Controller,
    Get,
    NotFoundException,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";

import {ImageService} from "./image.service";
import {fileFormatValidator} from "./validation/image.validation";

@Controller("/v1/image")
export class ImageController {
    public constructor(private readonly imageService: ImageService) {}

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    public async uploadFile(
        @UploadedFile(new ParseFilePipe({validators: [fileFormatValidator()]}))
        file: Express.Multer.File,
    ) {
        try {
            const image = await this.imageService.insert(file.buffer, file.size, file.mimetype);
            return image;
        } catch (e) {
            throw new BadRequestException("Failed to upload image");
        }
    }

    @Get()
    public async getImage(@Query("id") id: string) {
        const image = await this.imageService.getById(id);

        if (image) {
            return image;
        } else {
            throw new NotFoundException("File not found");
        }
    }
}
