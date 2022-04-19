import React, { FormEvent, useState } from "react";
import {
  Button,
  EmailInput,
  Footer,
  FormLayout,
  Header,
  Layout, Main as MainContainer,
  PasswordInput
} from "../components";
import { useRouter } from "next/router";
import { errorLogger, registration } from "../helpers";
import { CustomLink } from "../components/CustomLink";
import Head from "next/head";
import axios, { AxiosError } from "axios";


const NewUser = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const register = async (e: MouseEvent | FormEvent): Promise<void> => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };
    if (password === confirmPassword) {
      try {
        const res = await registration(requestBody);
        if (res.status === 201) await router.push("/");
      } catch (error: unknown) {
        axios.isAxiosError(error)
          ? setErrorMessage((error.response.data as AxiosError)?.message)
          : setErrorMessage("Something went wrong")
        errorLogger(error);
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
        <MainContainer title={errorMessage ? errorMessage : "Registration"}>
          <FormLayout onSubmit={register}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput
              onChange={setPassword}
              value={password}
            />
            <PasswordInput
              onChange={setConfirmPassword}
              value={confirmPassword}
              className={["row-start-3"]}
              placeholder="Confirm password"
            />
            <CustomLink href={'login'} name={"Login"} left/>
            <Button isError={!!errorMessage}>Registration</Button>
          </FormLayout>
        </MainContainer>
      </Layout>
      <Footer href={'login'} name={"Sign in"}/>
    </>
  );
};

export default NewUser;
