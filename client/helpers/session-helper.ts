import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import { getTokenCookie, setTokenCookie } from "./cookies-helper";
import { Session } from "../types";

const TOKEN_SECRET =
  process.env.TOKEN_SECRET ||
  "minimum 32 symbols__________________________________________________________________";
const COOKIES_MAX_AGE = process.env.COOKIES_MAX_AGE || 900000; //in milliseconds

export const setSession = async (
  res: NextApiResponse,
  userData: {email: string},
): Promise<void> => {
  const createdAt = Date.now();
  const obj = { userData, createdAt, maxAge: COOKIES_MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);
  setTokenCookie(res, token);
};

export const getSession = async (req: NextApiRequest): Promise<Session> => {
  const token = getTokenCookie(req);

  if (!token) return;

  const session: Session = await Iron.unseal(
    token,
    TOKEN_SECRET,
    Iron.defaults,
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;


  if (Date.now() > expiresAt) {
    throw new Error("Session is not valid");
  }

  return session;
};
