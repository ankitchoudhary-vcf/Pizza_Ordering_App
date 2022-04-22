import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/core/constants";
import { UserDto } from "./dto/user.dto";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof Users){}

    // To creates a new User into the users table and returns the newly created user object.
    async create(user: UserDto): Promise<Users> {
        return await this.userRepository.create<Users>(user);
    }

    // To find a user from the users table by email and return the user.
    async findOneByEmail(Email: string): Promise<Users> {
        return await this.userRepository.findOne<Users>({ where: { Email } });
    }

    // To find user fro the users table by using the User ID and return the user.
    async findOneById(id: number): Promise<Users> {
        return await this.userRepository.findOne<Users>({ where: { id } });
    }
}
