import { deleteTokenCookie } from "../../utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  deleteTokenCookie(res);
  res.writeHead(302, { Location: "/login" });
  res.end();
}
