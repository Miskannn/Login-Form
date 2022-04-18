import { getSession } from "../../helpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession(req);
    res.status(200).json({
      email: session.userData.email,
    });
  } catch {
    res.status(401).end("Auth token isn`t valid, please log in");
  }
}
