import {Test, TestingModule} from "@nestjs/testing";
import {createMock, DeepMocked} from "@golevelup/ts-jest";

import {ImageController} from "./image.controller";
import {ImageService} from "./image.service";
import {Image} from "./models/image.entity";
import {MOCK_IMAGE_ID, createImage} from "./__mocks__/models";

describe("ImageController", () => {
    let controller: ImageController;
    let mockImageService: DeepMocked<ImageService>;

    beforeEach(async () => {
        mockImageService = createMock<ImageService>();

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ImageController],
            providers: [
                {
                    provide: ImageService,
                    useValue: mockImageService,
                },
            ],
        })
            .useMocker(createMock)
            .compile();

        controller = module.get<ImageController>(ImageController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });

    describe("GET image", () => {
        it("should throw a 404 if image is not found", async () => {
            mockImageService.getById.mockImplementation(() => Promise.resolve(null));

            await expect(controller.getImage(MOCK_IMAGE_ID)).rejects.toThrow();
        });

        it("should get an image", async () => {
            const mockImage = createImage();
            mockImageService.getById.mockImplementation(() => Promise.resolve(<Image>mockImage));

            const response = await controller.getImage(MOCK_IMAGE_ID);

            expect(response).toEqual(mockImage);
        });
    });
});
