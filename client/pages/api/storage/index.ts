import { User } from "../../../types";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

const store = Symbol.for("store");
global[store] = global[store] || new Map<string, string>();

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = bcrypt.hashSync(password, 5);
  global[store].set(email, hashedPassword);
  return { email, password };
};

export const findByEmail = async (email: string): Promise<User | undefined> => {
  const candidate = global[store].has(email);
  if (candidate) {
    const candidatePassword = global[store].get(email);
    return { email: email, password: candidatePassword };
  }
};

export const createNewPassword = async (email: string) => {
  const randomPassword = crypto.randomBytes(6).toString("hex");
  await createUser(email, randomPassword);
  return randomPassword;
};
