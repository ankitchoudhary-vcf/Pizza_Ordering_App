import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';


// To handle the api/auth
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // To handle the api/auth/login
    /**
     * @UseGuards(AuthGuard('local')) is used to validate the user.
     */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }


    // To handle the api/auth/signup
    /**
     * @UseGuards(DoesUserExist) checks for the Email already exists or not.
     */
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return await this.authService.register(user);
    }
}