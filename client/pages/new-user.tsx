import React, { useState } from "react";
import {
  Button,
  EmailInput,
  Footer,
  FormLayout,
  Header,
  Layout,
  Main,
  PasswordInput,
} from "../components";
import { useRouter } from "next/router";
import { registration } from "../helpers";
import { Title } from "../types";
import { CustomLink } from "../components/CustomLink";
import Head from "next/head";

const NewUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };
    if (password === confirmPassword) {
      try {
        const res = await registration(requestBody);
        if (res.status === 201) await router.push("/");
      } catch (error) {
        setErrorMessage(error.response.data.errorMessage as Title);
      }
    } else {
      setErrorMessage("Please confirm password");
    }
  };

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <Layout>
        <Header />
        <Main title={errorMessage ? errorMessage : "Register"}>
          <FormLayout
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => register(e)}
          >
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput
              className={"row-start-2"}
              onChange={setPassword}
              value={password}
            />
            <PasswordInput
              className={"row-start-3"}
              onChange={setConfirmPassword}
              value={confirmPassword}
              placeholder={"Confirm password"}
            />
            <CustomLink name="Login" href="login" />
            <Button clickHandler={register}>Registration</Button>
          </FormLayout>
        </Main>
        <Footer href={"login"} name={"Sign in"} />
      </Layout>
    </>
  );
};

export default NewUser;
