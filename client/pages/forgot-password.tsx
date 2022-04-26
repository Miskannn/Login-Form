import React, { useState } from "react";
import { Button, EmailInput, Footer, FormLayout, Header, Layout, Main } from "../components";
import { forgotPassword } from "../api/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import Head from "next/head";
import { CustomLink } from "../components/CustomLink";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshPassword = async (e: MouseEvent | React.FormEvent) => {
    try {
      e.preventDefault();
      const res: AxiosResponse = await forgotPassword({
        email: forgotPasswordEmail,
      });
      if(res.status === 200){
        setNewPassword(true);
        setErrorMessage(null);
      }
    } catch (error: unknown) {
      axios.isAxiosError(error)
        ? setErrorMessage((error?.response?.data as AxiosError)?.message)
        : setErrorMessage("Something went wrong");
      setNewPassword(false);
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot password</title>
      </Head>
      <Layout className="mt-4 lg:mt-1.6rem">
        <Header />
        <Main className="mt-4 lg:mt-5" title="Password recovery">
            {newPassword && (
              <h2 className="tracking-tight lg:tracking-normal mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-md">
                Password successfully changed,<br/>
                see it in server logs
              </h2>
            )}
            {errorMessage && !newPassword && (
              <h2 className="tracking-tight lg:tracking-normal mb-3 sm:mb-5 ml-7 lg:mb-10 lg:font-bold lg:text-md">
                {errorMessage}
              </h2>
            )}
          <FormLayout onSubmit={refreshPassword} className="mt-5">
            <EmailInput
              onChange={setForgotPasswordEmail}
              value={forgotPasswordEmail}
            />
            <CustomLink href="login" name="Return to SignIn">
              <ArrowLeftIcon className="w-4 h-4 inline-block mr-2 mb-1" />
            </CustomLink>
            <Button isError={!!errorMessage}>
              Get password
            </Button>
          </FormLayout>
        </Main>
      </Layout>
      <Footer  />
    </>
  );
};

export default ForgotPassword;
