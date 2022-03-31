import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: 'A username is required' })
  @IsEmail({ message: 'A email is required to login' })
  readonly email: string;

  @IsNotEmpty({ message: 'A password is required to login' })
  @MinLength(8, { message: 'Password must be minimum 8 symbols length' })
  readonly password: string;
}
