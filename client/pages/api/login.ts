import { setSession } from "../../helpers";
import { findByEmail } from "./storage";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { password, email } = req.body;
    const candidate = await findByEmail(email);
    const passwordCompares = await bcrypt.compare(password, candidate.password);
    if (candidate.email === email && passwordCompares) {
      await setSession(res, {
        email: candidate.email,
      });
      res.status(200).json({});
    } else if (!candidate.email || !email) {
      res.status(401).json({ errorMessage: "Wrong email" });
    } else if (!passwordCompares) {
      res.status(401).json({ errorMessage: "Wrong password" });
    }
  }
}
