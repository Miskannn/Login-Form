import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user.model';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  login(@Body() dto: UserModel) {
    console.log('ok');
    return this.authService.login(dto);
  }

  @Post('registration')
  registration(@Body() dto: UserModel) {
    console.log('ok');
    return this.authService.registration(dto);
  }

  @HttpCode(200)
  @Post('/logout')
  logout(@Body() dto: UserModel) {
    return this.authService.logout(dto);
  }
}
