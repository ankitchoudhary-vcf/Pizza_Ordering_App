import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // To Validate the user if user exists then match the user password and return the user object.
  async validateUser(username: string, pass: string) {

    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.Password);
    if (!match) {
      return null;
    }

    const { password, ...result } = user['dataValues'];
    return result;
  }
  
  // To login the user. It generates a token and the return the token and the user object.
  public async login(user: any) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  // To register the user. It saves the user information to the database and then returns the token and the user object.
  public async register(user: UserDto) {

    const pass = await this.hashPassword(user.Password);
    const newUser = await this.userService.create({ ...user, Password: pass });
    const { password, ...result } = newUser['dataValues'];
    const token = await this.generateToken(result);

    return { user: result, token };
  }

  // Generate token
  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  // Hash the password
  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  // Compare the user-entered password against the DataBase password.
  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
