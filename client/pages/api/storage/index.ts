import { string } from "prop-types";
import { User } from "../../../types";

const bcrypt = require("bcrypt");

const users = new Map<string, string>();

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  password = bcrypt.hashSync(password, 5);
  users.set(email, password);
  return { email, password };
};

export const findByEmail = async (email: string): Promise<User> => {
  const candidatePassword = users.get(email);
  return candidatePassword
    ? { email: email, password: candidatePassword }
    : null;
};
