export type UserSchemaStore = Map<
  string,
  {
    hashedPassword: string;
    hashedRt: string;
  }
>;
