import { findByEmail } from "../../storage";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userEmail } = req.query;
    const user = findByEmail(userEmail);
    res.status(200).json(user);
  }
}
