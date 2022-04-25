import { setSession } from "../../utils";
import { StorageService } from "../../services";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { authSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const checkBodyValidity = await authSchema.isValid(req.body)
  if (req.method === "POST" && checkBodyValidity) {
    const { password, email } = req.body;
    const candidate = await StorageService.findByEmail(email);
    if (candidate) {
      const passwordCompares = await bcrypt.compare(
        password,
        candidate.password,
      );
      if (passwordCompares) {
        const cookie = await setSession( {
          email: candidate.email,
        });
        return res.setHeader("Set-Cookie", cookie).status(200).json({});
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }
    } else {
      return res.status(401).json({ message: "Wrong email" });
    }
  }
}
