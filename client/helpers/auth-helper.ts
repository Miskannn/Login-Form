import Router from "next/router";
import axios, { AxiosResponse } from "axios";

export const logout = async (): Promise<void> => {
  const res = await axios.get("/api/logout");
  if (res.status === 200) {
    await Router.push("/login");
  }
};

export const login = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => await axios.post("/api/login", body);

export const registration = async (body: {
  email: string;
  password: string;
}): Promise<AxiosResponse> => await axios.post("/api/registration", body);

export const getUserInfo = async (): Promise<{ email: string } | void> => {
  const res = await axios.get("/api/user-info");
  if (res.status === 200) {
    return res.data.email;
  } else {
    await Router.push("/login");
  }
};

export const forgotPassword = async (body: { email: string }) =>
  await axios.put("/api/forgot-password", body);
