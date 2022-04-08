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
    const logoutUser = this.usersService.findOne(email);
    if (logoutUser) return email;
  }

  async registration(
    dto: RegisterRequest,
    req,
  ): Promise<{
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: { password: string; email: string };
  }> {
    const validAccessCode = this.accessCodeValidation(req.cookies.access_code);
    if (validAccessCode) {
      const { email, password } = dto;
      const candidatePassword = await this.usersService.findOne(email);
      if (candidatePassword)
        throw new HttpException(
          `User with this email ${email} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      const tokens = await this.getTokens(email);
      const hashedPassword: string = await bcrypt.hash(password, 5);
      await this.usersService.createUser(
        email,
        hashedPassword,
        tokens.refresh_token,
      );
      return {
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        },
        user: {
          email,
          password,
        },
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(
    dto: LoginRequest,
    req,
  ): Promise<{
    tokens: Promise<Tokens>;
    user: { password: string; email: string };
  }> {
    try {
      const accessCode = req.cookies.access_code;
      const validAccessCode = this.accessCodeValidation(accessCode);
      if (validAccessCode) {
        const { email, password } = dto;
        const candidate = await this.usersService.validateUser(
          email,
          password,
          accessCode,
        );
        if (candidate) {
          return {
            tokens: this.getTokens(candidate.email),
            user: {
              email,
              password,
            },
          };
        }
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
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');
    const rtMatches = await bcrypt.compare(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');
    //  await this.updateRtHash(email, tokens.refresh_token);

    return await this.getTokens(email);
  }

  // async updateRtHash(email: string, rt: string): Promise<void> {
  //   const hash = await bcrypt.hash(rt);
  //   // await this.users.({
  //   //   where: {
  //   //     id: userId,
  //   //   },
  //   //   data: {
  //   //     hashedRt: hash,
  //   //   },
  //   // });
  // }

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

  async createSessionCode() {
    const accessCode = crypto.randomBytes(8).toString('hex');
    const existingCode = await this.accessCodeValidation(accessCode);
    if (existingCode) {
      await this.createSessionCode();
    }
    await this.usersService.setAccessCode(accessCode);
    return accessCode;
  }

  async accessCodeValidation(accessCode: string) {
    return this.usersService.checkCode(accessCode);
  }
}
