import { NextApiRequest } from "next";
import Iron from "@hapi/iron";
import { getTokenCookie, setTokenCookie } from "./cookies";
import { Session } from "../types";

const TOKEN_SECRET =
  process.env.TOKEN_SECRET ||
  "minimum 32 symbols__________________________________________________________________";
const COOKIES_MAX_AGE = Number(process.env.COOKIES_MAX_AGE) || 900000; //in milliseconds

export const setSession = async (
  // res: NextApiResponse,
  userData: {email: string},
): Promise<string> => {
  const createdAt = Date.now();
  const obj = { userData, createdAt, maxAge: COOKIES_MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);
  return setTokenCookie(token);
};

export const getSession = async (req: NextApiRequest): Promise<Session | void> => {
  const token = getTokenCookie(req);

  if (!token) return;

  const session: Session = await Iron.unseal(
    token,
    TOKEN_SECRET,
    Iron.defaults,
  );

  const sessionExpired = (session.createdAt + session.maxAge) - Date.now() < 0;

  if (sessionExpired) {
    throw new Error("Session is not valid");
  }

  return session;
};
