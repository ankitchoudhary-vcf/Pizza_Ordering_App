// User Data Transfer Object schema.
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
export class UserDto {

    @IsNotEmpty()
    readonly Name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly Email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly Password: string;
}
