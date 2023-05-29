import {S3} from "@aws-sdk/client-s3";
import {Injectable, Logger} from "@nestjs/common";
import {parseUrl} from "@aws-sdk/url-parser";
import {HttpRequest} from "@aws-sdk/protocol-http";
import {formatUrl} from "@aws-sdk/util-format-url";
import {S3RequestPresigner} from "@aws-sdk/s3-request-presigner";
import {Hash} from "@aws-sdk/hash-node";

import {ImageBucketException} from "./image.bucket.exceptions";
import {AppConfig} from "../../types";
import {AwsCredentials} from "../../aws/aws.credentials";
import {ConfigurationProvider} from "../../configuration/configuration.provider";

@Injectable()
export class ImageBucket {
    public static readonly TOKEN = ImageBucket.name;
    private readonly s3: S3;
    private readonly s3Presigner: S3RequestPresigner;
    private readonly bucketName: string;
    private readonly bucketUrl: string;
    private readonly EXPIRY_TIME: number = 30 * 60; /* 30 minutes */
    private readonly logger = new Logger(ImageBucket.name);

    public constructor(private readonly configurationProvider: ConfigurationProvider<AppConfig>) {
        const awsCredentials = this.configurationProvider.get<AwsCredentials>("awsCredentials");
        const {accessKeyId, secretAccessKey, bucketName, bucketRegion} = awsCredentials;
        this.bucketName = bucketName;
        this.bucketUrl = `https://${this.bucketName}.s3.amazonaws.com`;

        this.s3 = new S3({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
            region: bucketRegion,
        });
        this.s3Presigner = new S3RequestPresigner({
            region: bucketRegion,
            sha256: Hash.bind(null, "sha256"),
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
    }

    public async put(
        imageId: string,
        imageBuffer: Buffer,
        imageSize: number,
        imageMimeType: string,
    ): Promise<string> {
        try {
            const res = await this.s3.putObject({
                Body: imageBuffer,
                Key: imageId,
                Bucket: this.bucketName,
                ContentLength: imageSize,
                ContentType: imageMimeType,
            });

            if (res.$metadata.httpStatusCode === 200) {
                return `${this.bucketUrl}/${imageId}`;
            }
        } catch (e) {
            this.logger.error(`Failed to save image in bucket: ${e.getMessage()}`);
            throw new ImageBucketException(`Failed to save image: ${imageId}: ${e.getMessage()}`);
        }

        throw new ImageBucketException(`Failed to save: ${imageId}`);
    }

    public async delete(imageName: string): Promise<boolean> {
        try {
            const res = await this.s3.deleteObject({
                Key: imageName,
                Bucket: this.bucketName,
            });

            return res.DeleteMarker === true;
        } catch (e) {
            this.logger.error(`Failed to delete image in bucket: ${e.getMessage()}`);
            throw new ImageBucketException(
                `Failed to delete image with name: ${imageName}: ${e.getMessage()}`,
            );
        }
    }

    public async get(imageUrl: string): Promise<string> {
        try {
            console.log(imageUrl);
            const objectUrl = parseUrl(imageUrl);
            const request = new HttpRequest(objectUrl);
            const response = await this.s3Presigner.presign(request, {expiresIn: this.EXPIRY_TIME});

            if (!response) {
                this.logger.error(`No image found for url`);
                throw new ImageBucketException(`S3 ERROR: url ${imageUrl} does not exist`);
            }

            console.log(response);
            return formatUrl(response);
        } catch (e) {
            this.logger.error(`Failed to get image: ${e.getMessage()}`);
            throw new ImageBucketException(`Failed to get image ${imageUrl}: ${e.getMessage()}`);
        }
    }
}
