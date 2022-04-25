import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const tokenName = process.env.TOKEN_NAME || "token";
const env = process.env.NODE_ENV || "production";

export const setTokenCookie = (token: string) => {
  return serialize(tokenName, token, {
    maxAge: Number(process.env.COOKIES_MAX_AGE) || 900000,
    httpOnly: env !== "development",
    secure: true,
    path: "/",
  })
};

export const deleteTokenCookie = (res: NextApiResponse) => {
  const cookie = serialize(tokenName, "", {
    httpOnly: env !== "development",
    secure: true,
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
