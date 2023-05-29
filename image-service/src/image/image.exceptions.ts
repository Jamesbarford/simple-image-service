export class ImageRepositoryException extends Error {
    public readonly name = "ImageRepositoryException";
    public constructor(message: string) {
        super(message);
    }
}

export class ImageServiceException extends Error {
    public readonly name = "ImageServiceException";
    public constructor(message: string) {
        super(message);
    }
}
