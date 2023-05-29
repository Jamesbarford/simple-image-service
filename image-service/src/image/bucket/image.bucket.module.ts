import {Module} from "@nestjs/common";
import {ImageBucket} from "./image.bucket";

@Module({
    imports: [],
    providers: [ImageBucket, {provide: ImageBucket.TOKEN, useExisting: ImageBucket}],
    exports: [ImageBucket.TOKEN],
})
export class ImageBucketModule {}
