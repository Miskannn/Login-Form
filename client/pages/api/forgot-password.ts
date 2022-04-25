import { NextApiRequest, NextApiResponse } from "next";
import { PasswordReminderService, StorageService } from "../../services";
import { changeInfoSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const checkBodyValidity = await changeInfoSchema.isValid(req.body)
  if (req.method === "PUT" && checkBodyValidity) {
    const { email } = req.body;
    try {
      const candidate = await StorageService.findByEmail(email);
      if (candidate) {
        const password = await PasswordReminderService.createNewPassword();
        await StorageService.saveUser(candidate.email, password);
        console.log(`User with email: ${candidate.email}, changed password to: ${password}`)
        return res.status(200).json({});
      }
    } catch {
      //intentionally empty
    }
    return res.status(401).json({ message: "Not authorized" });
  }
}
