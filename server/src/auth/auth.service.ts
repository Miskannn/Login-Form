import {
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
import { LoginRequest, RegisterRequest } from '../dtos';
import { JwtPayload, Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async logout(dto: UserModel): Promise<string> {
    const { email } = dto;
    const logoutUser = await this.usersService.findOne(email);
    if (logoutUser) {
      logoutUser.rt = null;
      return email;
    }
    throw new UnauthorizedException();
  }

  async registration(dto: RegisterRequest): Promise<{ access_code: string }> {
    const { email, password } = dto;
    const candidate = await this.usersService.findOne(email);
    if (candidate) {
      throw new HttpException(
        `User with this email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword: string = await bcrypt.hash(password, 5);
    await this.usersService.createUser(email, hashedPassword, null);
    const accessCode = await this.createAccessCode(email);
    return { access_code: accessCode };
  }

  async login(dto: LoginRequest, res): Promise<typeof res> {
    try {
      const { email, password } = dto;
      const candidate = await this.usersService.validateUser(email, password);
      if (candidate) {
        const accessCode = await this.createAccessCode(email);
        return { access_code: accessCode };
      }
    } catch (error: any) {
      throw new UnauthorizedException();
    }
  }

  async recovery(dto: Omit<UserModel, 'password'>) {
    return this.usersService.forgotPassword(dto.email);
  }

  async refresh(email: string, rt: string): Promise<Tokens> {
    const user = await this.usersService.findOne(email);
    if (!user || !user.rt) throw new ForbiddenException('Access Denied');
    if (!(user.rt === rt)) throw new ForbiddenException('Access Denied');
    return await this.getTokens(email);
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

  async accessControl(email: string, access_code: string): Promise<Tokens> {
    const validAccessCode = this.accessCodeValidation(email, access_code);
    if (validAccessCode) {
      const user = await this.usersService.findOne(email);
      const tokens = await this.getTokens(email);
      user.rt = tokens.refresh_token;
      return tokens;
    } else {
      throw new UnauthorizedException();
    }
  }

  async createAccessCode(email: string) {
    const accessCode = crypto.randomBytes(8).toString('hex');
    await this.usersService.setAccessCode(email, accessCode);
    return accessCode;
  }

  private accessCodeValidation(email: string, accessCode: string) {
    return this.usersService.checkCode(email, accessCode);
  }
}
