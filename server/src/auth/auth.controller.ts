import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Response,
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

  @HttpCode(200)
  @Post('login')
  login(
    @Body() dto: LoginRequest,
    @Req() req,
  ): Promise<{
    tokens: Promise<Tokens>;
    user: { password: string; email: string };
  }> {
    return this.authService.login(dto, req);
  }

  @Get('redirect')
  async getAccessCode(@Response() res) {
    const accessCode = await this.authService.createSessionCode();
    return res
      .cookie('access_key', accessCode, { httpOnly: true })
      .status(300)
      .redirect('http://localhost:3000/login');
  }

  @Post('registration')
  registration(
    @Body() dto: RegisterRequest,
    @Req() req,
  ): Promise<{
    tokens: {
      access_token: string;
      refresh_token: string;
    };
    user: { password: string; email: string };
  }> {
    return this.authService.registration(dto, req);
  }

  @HttpCode(200)
  @Get('logout')
  logout(@Body() dto: LoginRequest): Promise<string> {
    return this.authService.logout(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('recovery')
  recovery(
    @Body() dto: Omit<UserModel, 'password'>,
  ): Promise<string | UnauthorizedException> {
    return this.authService.recovery(dto);
  }

  @Public()
  @Post('refresh')
  refresh(@Body() email: string, rt: string): Promise<Tokens> {
    return this.authService.refresh(email, rt);
  }
}
