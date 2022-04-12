import { getSession } from "../../helpers";

export default async function userInfo(req, res) {
  try {
    const session = await getSession(req);
    res.status(200).json({
      email: session.userData.email,
    });
  } catch {
    res.status(401).end("Auth token isn`t valid, please log in");
  }
}
