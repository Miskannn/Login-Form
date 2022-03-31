import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersService {
  private users: Map<string, string> = new Map([]);

  async findOne(email: string) {
    return this.users.get(email);
  }

  async createUser(email: string, password: string) {
    return this.users.set(email, password);
  }

  async validateUser(email: string, password: string) {
    const userPassword = this.users.get(email);
    console.log(email, password);
    const passwordEquals = await bcrypt.compare(password, userPassword);
    if (userPassword && passwordEquals) {
      return { email, password };
    }
    throw new UnauthorizedException({
      message: 'Not correct email or password',
    });
  }
}
