import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest, AccessControlRequest, LoginRequest } from '../dtos';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModel } from '../models/user.model';
import { Tokens } from './types';
import { Public } from '../decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() dto: LoginRequest, @Response() res): Promise<typeof res> {
    return this.authService.login(dto, res);
  }

  // @Get('redirect')
  // async getAccessCode(@Response() res, @Body() email) {
  //   const accessCode = await this.authService.createAccessCode(email);
  //   return res
  //     .cookie('access_key', accessCode, { httpOnly: true })
  //     .status(300)
  //     .redirect('http://localhost:3000/login');
  // }

  @Post('registration')
  registration(@Body() dto: RegisterRequest): Promise<{ access_code: string }> {
    return this.authService.registration(dto);
  }

  @HttpCode(200)
  @Get('logout')
  logout(@Body() dto: LoginRequest): Promise<string> {
    return this.authService.logout(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('recovery')
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

  @HttpCode(200)
  @Post('access-control')
  accessControl(@Body() dto: AccessControlRequest) {
    const { email, access_code } = dto;
    return this.authService.accessControl(email, access_code);
  }
}
