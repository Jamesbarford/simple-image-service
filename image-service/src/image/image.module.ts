import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";

import {ImageController} from "./image.controller";
import {ImageService} from "./image.service";
import {ImageRepository} from "./image.repository";
import {Image} from "./models/image.entity";
import {DatabaseTransactionRunner} from "../database/database.transaction";
import {ImageBucketModule} from "./bucket/image.bucket.module";

@Module({
    imports: [SequelizeModule.forFeature([Image]), ImageBucketModule],
    providers: [ImageService, ImageRepository, DatabaseTransactionRunner],
    controllers: [ImageController],
})
export class ImageModule {}
