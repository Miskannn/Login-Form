import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ValidationError } from 'class-validator';
import { UserSchemaStore } from '../auth/types';

@Injectable()
export class UsersService {
  private users: UserSchemaStore = new Map();
  private access_codes: Map<string, string> = new Map();

  async findOne(email: string) {
    return this.users.get(email);
  }

  async hasUser(email: string) {
    return this.users.has(email);
  }

  checkCode(email: string, accessCode: string): boolean {
    const candidateAccessCode = this.access_codes.get(email);
    return accessCode == candidateAccessCode;
  }

  async setAccessCode(email: string, accessCode: string) {
    return this.access_codes.set(email, accessCode);
  }

  async forgotPassword(email: string): Promise<string | UnauthorizedException> {
    const existingUser = this.users.get(email);
    if (existingUser) {
      const randomPassword = crypto.randomBytes(8).toString('hex');
      this.users.set(email, {
        rt: existingUser.rt,
        hashedPassword: await bcrypt.hash(randomPassword, 5),
      });
      return randomPassword;
    }
    throw new UnauthorizedException({ message: 'User don`t authorized' });
  }

  async createUser(
    email: string,
    password: string,
    refreshToken: string | null,
  ) {
    const existingUser = this.users.get(email);
    if (!existingUser) {
      return this.users.set(email, {
        hashedPassword: password,
        rt: refreshToken,
      });
    }
    return new ValidationError();
  }

  async validateUser(email: string, password: string) {
    const userPassword = this.users.get(email).hashedPassword;
    const passwordEquals = await bcrypt.compare(password, userPassword);
    const validUser = userPassword && passwordEquals;
    if (validUser) {
      return { email, password };
    }
    throw new UnauthorizedException({
      message: 'Not correct email or password',
    });
  }
}
