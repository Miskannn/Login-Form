import axios from "axios";

export const login = async (body: { email: string; password: string }) => {
  return await axios.post("https://localhost:5000/api/auth/login", body);
};
