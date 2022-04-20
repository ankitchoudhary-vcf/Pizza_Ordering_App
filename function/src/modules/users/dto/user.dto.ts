// User Data Transfer Object schema.
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
export class UserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}