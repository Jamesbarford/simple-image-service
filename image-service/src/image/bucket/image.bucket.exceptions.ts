export class ImageBucketException extends Error {
    public readonly name = "ImageBucketException";
    public constructor(message: string) {
        super(message);
    }
}
