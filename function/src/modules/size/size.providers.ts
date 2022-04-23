import { SIZE_REPOSITORY } from "src/core/constants";
import { Size } from "./size.entity";

export const sizeProvider = [{
    provide: SIZE_REPOSITORY,
    useValue: Size,
}]