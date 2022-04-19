import { User } from "../../types";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

const store = Symbol.for("store");
type Store = Map<string, string>;

declare const global: {
  [store]: Store;
};

global[store] = global[store] || new Map<string, string>();

export const createUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 5);
  global[store].set(email, hashedPassword);
  return { email, password };
};

export const findByEmail = async (email: string): Promise<User | undefined> => {
  const password = global[store].get(email);
  if (password) {
    return { email, password };
  }
};

export const createNewPassword = async (email: string): Promise<string> => {
  const randomPassword = crypto.randomBytes(6).toString("hex");
  await createUser(email, randomPassword);
  return randomPassword;
};
