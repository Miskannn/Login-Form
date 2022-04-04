import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ValidationError } from 'class-validator';
import { UserSchema, UserSchemaStore } from '../auth/types';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersService {
  private users: UserSchemaStore = new Map();

  async findOne(email: string) {
    return this.users.get(email);
  }

  async forgotPassword(email: string): Promise<string | UnauthorizedException> {
    const existingUser = this.users.get(email);
    if (existingUser) {
      const randomPassword = crypto.randomBytes(8).toString('hex');
      this.users.set(email, {
        hashedRt: existingUser.hashedRt,
        hashedPassword: bcrypt.hash(randomPassword, 5),
      });
      return randomPassword;
    }
    return new UnauthorizedException({ message: 'User don`t authorized' });
  }

  async createUser(email: string, password: string, refreshToken: string) {
    const existingUser = this.users.get(email);
    if (!existingUser) {
      return this.users.set(email, {
        hashedPassword: password,
        hashedRt: refreshToken,
      });
    }
    return new ValidationError();
  }

  async validateUser(email: string, password: string) {
    const userPassword = this.users.get(email);
    const passwordEquals = await bcrypt.compare(password, userPassword);
    if (userPassword && passwordEquals) {
      return { email, password };
    }
    throw new UnauthorizedException({
      message: 'Not correct email or password',
    });
  }
}
