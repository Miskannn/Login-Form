import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import uuid from 'uuid';

@Injectable()
export class UsersService {
  private users: Map<string, string> = new Map([]);

  async findOne(email: string) {
    return this.users.get(email);
  }

  async updateUser(email: string) {
    const existingUser = this.users.has(email);
    if (existingUser) {
      const randomPassword = uuid.v4();
      this.users.set(email, randomPassword);
      return randomPassword;
    }
    return new UnauthorizedException({ message: 'User don`t authorized' });
  }

  async createUser(email: string, password: string) {
    const existingUser = this.users.has(email);
    if (existingUser) {
      return this.users.set(email, password);
    }
    return null;
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
