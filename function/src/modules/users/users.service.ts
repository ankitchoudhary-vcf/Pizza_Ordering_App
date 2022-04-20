import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/core/constants";
import { USerDto } from "./dto/user.dto";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof Users){}

    // To creates a new User into the users table and returns the newly created user object.
    async create(user: USerDto): Promise<Users> {
        return await this.userRepository.create<Users>(user);
    }

    // To find a user from the users table by email and return the user.
    async findOneByEmail(email: string): Promise<Users> {
        return await this.userRepository.findOne<Users>({ where: { email } });
    }

    // To find user fro the users table by using the User ID and return the user.
    async findOneById(id: number): Promise<Users> {
        return await this.userRepository.findOne<Users>({ where: { id } });
    }
}
