import React, { useState } from "react";
import { Button, EmailInput, Footer, FormLayout, Header, Layout, Main } from "../components";
import { forgotPassword } from "../api/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import Head from "next/head";
import { CustomLink } from "../components/CustomLink";
import { ArrowLeftIcon } from "@heroicons/react/outline";

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
        ? setErrorMessage((error?.response?.data as AxiosError)?.message)
        : setErrorMessage("Something went wrong")
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <Layout className={["mt-10"]}>
        <Header />
        <Main title={"Password recovery"}>
          {newPassword && (
            <h2 className="tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-3xl">
              Your password is {newPassword}
            </h2>
          )}
          {errorMessage && !newPassword && (
            <h2 className="tracking-tight lg:tracking-normal font-semibold mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-3xl">
              {errorMessage}
            </h2>
          )}
          <FormLayout onSubmit={refreshPassword}>
            <EmailInput
              onChange={setForgotPasswordEmail}
              value={forgotPasswordEmail}
            />
            <CustomLink href={"login"} name={"Log in"}>
              <ArrowLeftIcon className={"w-4 h-4 inline-block mr-2 mb-1"} />
            </CustomLink>
            <Button isError={!!errorMessage}>
              Get password
            </Button>
          </FormLayout>
        </Main>
      </Layout>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ForgotPassword;
