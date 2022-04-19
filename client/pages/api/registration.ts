import { NextApiRequest, NextApiResponse } from "next";
import { createUser, findByEmail } from "../../lib/storage";
import { setSession } from "../../utils";
import { authSchema } from "../../schemas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const checkBodyValidity = await authSchema.isValid(req.body)
  if(req.method === "POST" && checkBodyValidity){
    const { email, password } = req.body;
    const candidate = await findByEmail(email);
    if (candidate) {
      res.status(409).json({ message: "User already exists" });
    }
    const newUser = await createUser(email, password);
    await setSession(res, {
      email: newUser.email,
    });
    return res.status(201).json({});
  }
}
