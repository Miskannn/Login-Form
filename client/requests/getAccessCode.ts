import axios from "axios";

export const getAccessCode = () => {
  return axios.get("https://localhost:5000/api/auth/redirect");
};
