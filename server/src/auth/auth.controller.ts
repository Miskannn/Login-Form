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
import { LoginRequest } from '../dtos/login.dt';
import { RegisterRequest } from '../dtos/registration.dt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModel } from '../models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(
    @Body() dto: LoginRequest,
  ): Promise<{ accessToken: string }> | Promise<UnauthorizedException> {
    return this.authService.login(dto);
  }

  @Post('registration')
  registration(@Body() dto: RegisterRequest): Promise<{ accessToken: string }> {
    return this.authService.registration(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('logout')
  logout(@Body() dto: LoginRequest): Promise<string> {
    return this.authService.logout(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recovery')
  recovery(
    @Body() dto: Omit<UserModel, 'password'>,
  ): Promise<string> | Promise<UnauthorizedException> {
    return this.authService.recovery(dto);
  }
}
