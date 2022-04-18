import React, { useState } from "react";
import { Button, EmailInput, FormLayout, Header, Layout, Main } from "../components";
import { errorLogger, forgotPassword } from "../helpers";
import axios, { AxiosError, AxiosResponse } from "axios";
import { CustomLink } from "../components/CustomLink";
import Head from "next/head";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshPassword = async (e: MouseEvent | React.FormEvent) => {
    try {
      e.preventDefault();
      const res: AxiosResponse = await forgotPassword({
        email: forgotPasswordEmail,
      });
      setNewPassword(res.data.password);
      setErrorMessage(null);
    } catch (error: unknown) {
      axios.isAxiosError(error)
        ? setErrorMessage((error.response.data as AxiosError)?.message)
        : setErrorMessage("Something went wrong")
      errorLogger(error);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <Layout className={["mt-10"]}>
        <Header />
        <Main title={"Forgot password"}>
          {newPassword && (
            <h2 className="text-lg tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-5xl">
              Your password is {newPassword}
            </h2>
          )}
          {errorMessage && (
            <h2 className="text-lg tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-5xl">
              {errorMessage}
            </h2>
          )}
          <FormLayout onSubmit={refreshPassword}>
            <EmailInput
              value={forgotPasswordEmail}
              onChange={setForgotPasswordEmail}
            />
            <Button isError={!!errorMessage} clickHandler={refreshPassword}>Get password</Button>
          </FormLayout>
          <br />
          <div className="flex justify-between">
            <CustomLink name="Login" href={"login"} />
            <CustomLink name="Registration" href={"new-user"} />
          </div>
        </Main>
      </Layout>
    </>
  );
};

export default ForgotPassword;
