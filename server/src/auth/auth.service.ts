import {
  Body,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterRequest } from '../dtos';
import { LoginRequest } from '../dtos';
import { JwtPayload, Tokens } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async logout(dto: UserModel): Promise<string> {
    const { email } = dto;
    const logoutUser = this.usersService.findOne(email);
    if (logoutUser) return email;
  }

  async registration(dto: RegisterRequest) {
    const { email, password } = dto;
    const candidatePassword = await this.usersService.findOne(email);
    if (candidatePassword)
      throw new HttpException(
        `User with this email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    const tokens = await this.getTokens(email);
    const hashedPassword: string = await bcrypt.hash(password, 5);
    const hashedToken = await bcrypt.hash(tokens.refresh_token, 5);
    await this.usersService.createUser(email, hashedPassword, hashedToken);
    return tokens;
  }

  async login(dto: LoginRequest) {
    try {
      const { email, password } = dto;
      const candidate = await this.usersService.validateUser(email, password);
      return this.getTokens(candidate.email);
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async recovery(dto: Omit<UserModel, 'password'>) {
    return this.usersService.forgotPassword(dto.email);
  }

  async refresh(email: string, refreshToken: string): Promise<Tokens> {
    return;
  }

  async refreshTokens(email: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.findOne(email);
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(email);
    await this.updateRtHash(email, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(email: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt);
    // await this.users.({
    //   where: {
    //     id: userId,
    //   },
    //   data: {
    //     hashedRt: hash,
    //   },
    // });
  }

  async getTokens(email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
