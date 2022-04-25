import { getSession } from "../../../utils";
import { NextApiRequest, NextApiResponse } from "next";
import { StorageService } from "../../../services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse | void> {
  try {
    const session = await getSession(req);
    const candidate = await StorageService.findByEmail(session?.userData.email as string || "");
    if(session && candidate){
      return res.status(200).json({
        email: session.userData.email,
      });
    } else {
      return res.status(401).end("Auth token isn`t valid, please log in");
    }
  } catch {
    return res.status(401).end("Auth token isn`t valid, please log in");
  }
}
