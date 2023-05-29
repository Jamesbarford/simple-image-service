import {Inject, Injectable, Logger} from "@nestjs/common";
import {v4 as uuid} from "uuid";

import {Image} from "./models/image.entity";
import {ImageBucket} from "./bucket/image.bucket";
import {ImageRepositoryException} from "./image.exceptions";
import {Maybe} from "../types";
import {DatabaseTransactionRunner} from "../database/database.transaction";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ImageRepository {
    private readonly logger = new Logger(ImageRepository.name);

    public constructor(
        @Inject(ImageBucket.TOKEN)
        private readonly imageBucket: ImageBucket,
        private readonly transactionRunner: DatabaseTransactionRunner,
        @InjectModel(Image)
        private readonly orm: typeof Image,
    ) {}

    public async insert(
        imageBuffer: Buffer,
        imageSize: number,
        imageMimeType: string,
    ): Promise<Image> {
        const imageId = uuid();

        try {
            const imageUrl = await this.imageBucket.put(
                imageId,
                imageBuffer,
                imageSize,
                imageMimeType,
            );

            return this.orm.create({
                id: imageId,
                url: imageUrl,
            });
        } catch (e) {
            this.logger.error(`Failed to insert image: ${e.getMessage()}`);
            console.log(e);
            throw new ImageRepositoryException(`Failed to insert image: ${e.getMessage()}`);
        }
    }

    public async delete(imageId: string): Promise<boolean> {
        const transaction = await this.transactionRunner.create();

        try {
            const image = await this.orm.findOne({
                where: {
                    id: imageId,
                },
            });

            if (!image) {
                return false;
            }

            const [_dbOk, bucketOk] = await Promise.all([
                image.destroy({transaction}),
                this.imageBucket.delete(imageId),
            ]);

            if (!bucketOk) {
                await transaction.rollback();
                return false;
            }
        } catch (e) {
            await transaction.rollback();
            this.logger.error(`Failed to delete '${imageId}' : ${e.getMessage}`);
            throw new ImageRepositoryException(
                `Failed to delete image '${imageId}': ${e.getMessage()}`,
            );
        }

        await transaction.commit();
        return true;
    }

    public async getById(imageId: string): Promise<Maybe<Image>> {
        try {
            const image = await this.orm.findOne({
                where: {
                    id: imageId,
                },
            });

            if (!image) {
                return null;
            }

            const imageUrl = await this.imageBucket.get(image.url);
            if (imageUrl) {
                image.url = imageUrl;
                return image;
            }
        } catch (e) {
            this.logger.error(`Failed to get image '${imageId}' : ${e.getMessage}`);
            throw new ImageRepositoryException(
                `Failed to get image by id '${imageId}': ${e.getMessage()}`,
            );
        }

        return null;
    }
}
