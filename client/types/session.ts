export interface Session {
  createdAt: number;
  maxAge: number;
  userData: {
    [key: string]: string;
  };
}
