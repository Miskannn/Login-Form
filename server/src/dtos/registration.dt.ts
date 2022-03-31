import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty({ message: 'A email is required' })
  @IsEmail({ message: 'A email is wrong' })
  readonly email: string;

  @IsNotEmpty({ message: 'A password is required' })
  @MinLength(6, { message: 'Your password must be at least 8 characters' })
  readonly password: string;
}
