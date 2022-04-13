import { setSession } from "../../helpers";
import { findByEmail } from "./storage";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { password, email } = req.body;
    const candidate = await findByEmail(email);
    if (candidate) {
      const passwordCompares = await bcrypt.compare(
        password,
        candidate.password
      );
      if (candidate.email === email && passwordCompares) {
        await setSession(res, {
          email: candidate.email,
        });
        res.status(200).json({});
      } else {
        res.status(401).json({ errorMessage: "Wrong password" });
      }
    } else {
      res.status(401).json({ errorMessage: "Wrong email" });
    }
  }
}
