# Simple Image Upload

- Uses S3 & nestjs
- Create an S3 bucket from the cdk folder, and export the name of the bucket as an environment variable
- Presently is limited to `.jpg|.jpeg` files
- Image url, from a get request, will expire after 30minutes
- Front end is available on `localhost:3000`

### Dependencies
- AWS
- postgres
- node@18


### Api
- POST `/v1/image`
- GET  `/v1/image?id=<string>`
