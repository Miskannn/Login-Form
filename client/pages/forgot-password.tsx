import React, { useState } from "react";
import { Button, EmailInput, FormLayout, Layout, Main } from "../components";
import { router } from "next/client";
import { forgotPassword } from "../helpers";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshPassword = async () => {
    try {
      const res = await forgotPassword({
        email: forgotPasswordEmail,
      });
      setNewPassword(res.data.password);
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <Layout className="mt-36">
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
        <FormLayout userAuth={false} requestHandler={refreshPassword}>
          <EmailInput
            value={forgotPasswordEmail}
            onChange={setForgotPasswordEmail}
          />
        </FormLayout>
        <br />
        <div className="flex justify-between">
          <Button clickHandler={() => router.push("/login")}>Login</Button>
          <Button clickHandler={() => router.push("/new-user")}>
            Registration
          </Button>
        </div>
      </Main>
    </Layout>
  );
};

export default ForgotPassword;
