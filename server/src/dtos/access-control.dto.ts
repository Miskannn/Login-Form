import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class AccessControlRequest {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({ message: 'A email is required to login' })
  email: string;

  @IsNotEmpty({ message: 'Access code is not valid' })
  @MinLength(8)
  access_code: string;
}
