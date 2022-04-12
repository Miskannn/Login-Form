import { router } from "next/client";
import { accessControl } from "../requests";
import { IDecodedToken } from "../types/DecodedToken";
import jwtDecode from "jwt-decode";

const logout = async () => {
  // localStorage.clear();
  await router.push("/login");
};

const accessControlValidation = async (
  body: { email: string },
  code: string,
  setEmail: (value: string) => void
) => {
  const accessValidation = await accessControl({
    email: body.email,
    access_code: code,
  });
  if (accessValidation.status == (200 || 201)) {
    const decodedToken: IDecodedToken = jwtDecode(
      accessValidation.data.access_token
    );
    setEmail(decodedToken.email);
    localStorage.setItem("access_token", accessValidation.data.access_token);
    return true;
  }
  return false;
};

export { accessControlValidation, logout };
