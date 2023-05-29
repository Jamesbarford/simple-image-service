import {Injectable} from "@nestjs/common";

import {Image} from "./models/image.entity";
import {ImageRepository} from "./image.repository";
import {Maybe} from "../types";

@Injectable()
export class ImageService {
    public constructor(private readonly imageRepository: ImageRepository) {}

    public async insert(
        imageBuffer: Buffer,
        imageSize: number,
        imageMimeType: string,
    ): Promise<Image | null> {
        return this.imageRepository.insert(imageBuffer, imageSize, imageMimeType);
    }

    public async delete(imageId: string): Promise<boolean> {
        return this.imageRepository.delete(imageId);
    }

    public async getById(imageId: string): Promise<Maybe<Image>> {
        return this.imageRepository.getById(imageId);
    }
}
