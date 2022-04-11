import axios from "axios";

export const forgotPassword = async (body: { email: string }) => {
  return await axios.post("https://localhost:5000/api/auth/recovery", body);
};
