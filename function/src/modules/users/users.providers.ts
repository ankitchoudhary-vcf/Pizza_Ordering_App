import { Users } from "./users.entity";
import { USER_REPOSITORY } from "src/core/constants";

export const usersProvider = [{
    provide: USER_REPOSITORY,
    useValue: Users,
}]
