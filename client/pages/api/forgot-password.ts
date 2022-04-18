import { NextApiRequest, NextApiResponse } from "next";
import { createNewPassword, findByEmail } from "./storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method === "PUT") {
    const { email } = req.body;
    try {
      const candidate = await findByEmail(email);
      if (candidate) {
        const password = await createNewPassword(candidate.email);
        res.status(200).json({ password: password });
      }
      res.status(401).json({ message: "User don`t authorized" });
    } catch {
      res.status(401).json({ message: "User don`t authorized" });
    }
  }
}
