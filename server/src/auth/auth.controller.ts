import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user.model';
import { LoginRequest } from '../dtos/login.dt';
import { RegisterRequest } from '../dtos/registration.dt';
import { AuthenticatedGuard } from './authenticated.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }

  @Post('registration')
  registration(@Body() dto: RegisterRequest) {
    return this.authService.registration(dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  logout(@Request() dto: UserModel) {
    return 'Hello world';
  }
}
