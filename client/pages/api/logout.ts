import { deleteTokenCookie } from "../../helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(302, { Location: "/" });
  deleteTokenCookie(res);
  res.end();
}
