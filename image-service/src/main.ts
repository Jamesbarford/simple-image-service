import {NestFactory} from "@nestjs/core";
import {json} from "express";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(json({limit: "10mb"}));

    await app.listen(3000);
    console.log(">>>>>>>>>>>>>>");
}
bootstrap();
