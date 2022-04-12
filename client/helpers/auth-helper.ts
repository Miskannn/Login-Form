import Router from "next/router";
import { getTokenCookie, setTokenCookie } from ".";
import Iron from "@hapi/iron";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../types";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "secretnyisecret";
const COOKIES_MAX_AGE = process.env.COOKIES_MAX_AGE || 15000000;

export const logout = async (): Promise<void> => {
  const res = await axios.get("/api/logout");
  if (res.statusText === "ok") {
    await Router.push("/");
  }
};

export const setSession = async (
  res: NextApiResponse,
  userData
): Promise<void> => {
  const createdAt = Date.now();
  const obj = { userData, createdAt, maxAge: COOKIES_MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);
  setTokenCookie(res, token);
};

export const getSession = async (req: NextApiRequest): Promise<Session> => {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error("Session is not valid");
  }

  return session;
};
