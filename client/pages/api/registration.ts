import { NextApiRequest, NextApiResponse } from "next";
import { StorageService } from "../../services";
import { setSession } from "../../utils";
import { authSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const checkBodyValidity = await authSchema.isValid(req.body)
  if(req.method === "POST" && checkBodyValidity){
    const { email, password } = req.body;
    const candidate = await StorageService.findByEmail(email);
    if (candidate) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await StorageService.saveUser(email, password);
    const cookie = await setSession({
      email: newUser.email,
    });
    return res.setHeader("Set-Cookie", cookie).status(201).json({});
  }
}
