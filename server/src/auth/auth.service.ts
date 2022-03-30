import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private users: Map<string, string> = new Map([]);

  async logout(dto: UserModel): Promise<any> {
    // return this.usersService.login();
  }

  async registration(@Body() dto: UserModel) {
    const { email, password } = dto;
    const candidatePassword = this.users.has(email);

    if (candidatePassword)
      throw new HttpException(
        `User with this email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );

    const hashPassword: string = await bcrypt.hash(password, 5);
    await this.users.set(email, hashPassword);
    return this.generateToken({ email, password: hashPassword });
  }

  async login(@Body() dto: UserModel) {
    const candidate = await this.validateUser(dto);
    return this.generateToken(candidate);
  }

  private async generateToken(user: {
    email: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      password: user.password,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(userDto: UserModel) {
    const userPassword = this.users.get(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, userPassword);
    if (userPassword && passwordEquals) {
      return { email: userDto.email, password: userDto.password };
    }
    throw new UnauthorizedException({
      message: 'Not correct email or password',
    });
  }
}
