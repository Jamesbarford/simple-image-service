import {Module} from "@nestjs/common";
import {ApplicationLogger} from "./logger";

@Module({
    providers: [ApplicationLogger],
    exports: [ApplicationLogger],
})
export class LoggerModule {}
