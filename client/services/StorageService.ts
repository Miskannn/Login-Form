import { User } from "../types";
import * as bcrypt from "bcrypt";

const store = Symbol.for("store");
type Store = Map<string, string>;

declare const global: {
  [store]: Store;
};

global[store] = global[store] || new Map<string, string>();


export class StorageService{
  static async saveUser (
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 5);
    global[store].set(email, hashedPassword);
    return { email, password };
  };

  static async findByEmail(email: string): Promise<User | undefined> {
    const password = global[store].get(email);
    if (password) {
      return { email, password };
    }
  }
}

