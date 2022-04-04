export type UserSchema = [
  [email: string],
  [{ hashedPassword: string; hashedRt: string }],
];
