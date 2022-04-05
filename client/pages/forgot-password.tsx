import React, { useState } from "react";
import { EmailInput, FormLayout, Main } from "../components";

const ForgotPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string>("");

  return (
    <Main title={"Forgot password"}>
      <FormLayout userAuth={false}>
        <EmailInput
          value={forgotPasswordEmail}
          onChange={setForgotPasswordEmail}
        />
      </FormLayout>
    </Main>
  );
};

export default ForgotPassword;
