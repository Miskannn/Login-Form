import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'A email is required to login' })
  readonly email: string;

  @IsNotEmpty({ message: 'A password is required to login' })
  @MinLength(6, { message: 'Password must be minimum 6 symbols length' })
  readonly password: string;
}
