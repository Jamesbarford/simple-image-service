export class AwsCredentials {
    public constructor(
        public readonly accessKeyId: string,
        public readonly secretAccessKey: string,
        public readonly region: string,
        public readonly bucketRegion: string,
        public readonly bucketName: string,
    ) {}

    public static builder(): AwsCredentialsBuilder {
        return new AwsCredentialsBuilder();
    }
}

export class AwsCredentialsBuilder {
    private accessKeyId?: string;
    private secretAccessKey?: string;
    private region?: string;
    private bucketRegion?: string;
    private bucketName?: string;

    public withAccessKeyId(accessKeyId: string): AwsCredentialsBuilder {
        this.accessKeyId = accessKeyId;
        return this;
    }

    public withSecretAccessKey(secretAccessKey: string): AwsCredentialsBuilder {
        this.secretAccessKey = secretAccessKey;
        return this;
    }

    public withRegion(region: string): AwsCredentialsBuilder {
        this.region = region;
        return this;
    }

    public withBucketRegion(bucketRegion: string): AwsCredentialsBuilder {
        this.bucketRegion = bucketRegion;
        return this;
    }

    public withBucketName(bucketName: string): AwsCredentialsBuilder {
        this.bucketName = bucketName;
        return this;
    }

    public build(): AwsCredentials {
        if (
            !this.accessKeyId ||
            !this.secretAccessKey ||
            !this.region ||
            !this.bucketRegion ||
            !this.bucketName
        ) {
            throw new Error("Missing properties in the AwsCredentials builder.");
        }
        return new AwsCredentials(
            this.accessKeyId,
            this.secretAccessKey,
            this.region,
            this.bucketRegion,
            this.bucketName,
        );
    }
}
