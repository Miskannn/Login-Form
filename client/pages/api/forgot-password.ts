import { NextApiRequest, NextApiResponse } from "next";
import { createNewPassword, findByEmail } from "../../lib/storage";
import { setSession } from "../../utils";
import { changeInfoSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const checkBodyValidity = await changeInfoSchema.isValid(req.body)
  if (req.method === "PUT" && checkBodyValidity) {
    const { email } = req.body;
    try {
      const candidate = await findByEmail(email);
      if (candidate) {
        const password = await createNewPassword(candidate.email);
        console.log(`User with email: ${candidate.email}, changed password to ${password}`)
        await setSession(res, {
          email: candidate.email,
        });
        res.status(200).json({ password: password });
      }
    } catch {
      //intentionally empty
    }
    res.status(401).json({ message: "Not authorized" });
  }
}
