export type UserSchemaStore = Map<
  string,
  {
    hashedPassword: string;
    rt: string;
  }
>;
