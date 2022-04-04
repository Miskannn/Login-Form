import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from '../dtos';
import { RegisterRequest } from '../dtos';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModel } from '../models/user.model';
import { Tokens } from './types';
import { Public } from '../decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  login(
    @Body() dto: LoginRequest,
  ): Promise<Tokens> | Promise<UnauthorizedException> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('registration')
  registration(@Body() dto: RegisterRequest): Promise<Tokens> {
    return this.authService.registration(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('logout')
  logout(@Body() dto: LoginRequest): Promise<string> {
    return this.authService.logout(dto);
  }

  @Get('recovery')
  recovery(
    @Body() dto: Omit<UserModel, 'password'>,
  ): Promise<string | UnauthorizedException> {
    return this.authService.recovery(dto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() email: string, refreshToken: string): Promise<Tokens> {
    return this.authService.refresh(email, refreshToken);
  }
}
