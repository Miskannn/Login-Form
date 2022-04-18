import { NextApiRequest, NextApiResponse } from "next";
import { createUser, findByEmail } from "./storage";
import { setSession } from "../../helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if(req.method === "POST"){
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
