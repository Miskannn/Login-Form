import axios from "axios";

export const registration = async (body: {
  email: string;
  password: string;
}) => {
  return await axios.post("https://localhost:5000/api/auth/registration", body);
};
