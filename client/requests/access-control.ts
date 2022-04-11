import axios from "axios";

export const accessControl = async (body: {
  email: string;
  access_code: string;
}) => {
  return await axios.post(
    "https://localhost:5000/api/auth/access-control",
    body
  );
};
