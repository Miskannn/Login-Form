import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get()
  helloWorld() {
    return 'hello';
  }
}
