import {Image, ImageBase} from "../models/image.entity";

export const MOCK_IMAGE_ID = "mock-image-id";
export const MOCK_IMAGE_URL = `https://${MOCK_IMAGE_ID}`;
export const MOCK_IMAGE_CREATED_AT = new Date();
export const MOCK_IMAGE_UPDATED_AT = new Date();

export function createImage(i?: Partial<Image>): ImageBase {
    return {
        id: i?.id || MOCK_IMAGE_ID,
        url: i?.url || MOCK_IMAGE_URL,
        createdAt: i?.createdAt || MOCK_IMAGE_CREATED_AT,
        updatedAt: i?.updatedAt || MOCK_IMAGE_UPDATED_AT,
    };
}
