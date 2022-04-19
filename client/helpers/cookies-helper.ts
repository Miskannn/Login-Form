import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const tokenName = process.env.TOKEN_NAME || "token";
const env = process.env.NODE_ENV || "production";

export const setTokenCookie = (res: NextApiResponse, token: string): void => {
  const cookie = serialize(tokenName, token, {
    maxAge: Number(process.env.COOKIES_MAX_AGE) || 900000,
    httpOnly: env !== "development",
    secure: true,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const deleteTokenCookie = (res: NextApiResponse): void => {
  const cookie = serialize(tokenName, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
};

export const parseCookies = (req: NextApiRequest) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || "");
};

export const getTokenCookie = (req: NextApiRequest) => {
  const cookies = parseCookies(req);
  return cookies[tokenName];
};
