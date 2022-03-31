import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterRequest } from '../dtos/registration.dt';
import { LoginRequest } from '../dtos/login.dt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async logout(dto: UserModel): Promise<any> {
    // return this.usersService.login();
  }

  async registration(@Body() dto: RegisterRequest) {
    const { email, password } = dto;
    const candidatePassword = await this.usersService.findOne(email);
    if (candidatePassword)
      throw new HttpException(
        `User with this email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword: string = await bcrypt.hash(password, 5);
    await this.usersService.createUser(email, hashedPassword);
    return this.generateToken(email);
  }

  async login(@Body() dto: LoginRequest) {
    try {
      const { email, password } = dto;
      const candidate = await this.usersService.validateUser(email, password);
      return this.generateToken(candidate.email);
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async generateToken(email: string): Promise<{ accessToken: string }> {
    const payload = {
      email: email,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
