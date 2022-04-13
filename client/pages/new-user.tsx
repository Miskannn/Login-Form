import React, { useState } from "react";
import {
  EmailInput,
  FormLayout,
  Header,
  Layout,
  Main,
  PasswordInput,
} from "../components";
import { useRouter } from "next/router";
import { registration } from "../helpers";
import { Title } from "../types";
import { LoginLink } from "../components/LoginLink";

const NewUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };
    try {
      const res = await registration(requestBody);
      if (res.status === 200) await router.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.errorMessage as Title);
    }
  };

  return (
    <>
      <Layout>
        <Header />
        <Main title={errorMessage ? errorMessage : "Register"}>
          <FormLayout userAuth registration onSubmit={register}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput onChange={setPassword} value={password} />
            <LoginLink />
          </FormLayout>
        </Main>
      </Layout>
    </>
  );
};

export default NewUser;
