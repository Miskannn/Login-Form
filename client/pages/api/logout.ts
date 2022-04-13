import { deleteTokenCookie } from "../../helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteTokenCookie(res);
  res.writeHead(302, { Location: "/login" });
  res.end();
}
