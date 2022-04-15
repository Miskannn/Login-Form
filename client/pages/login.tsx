import {
  EmailInput,
  Footer,
  PasswordInput,
  Main as MainContainer,
  FormLayout,
  Layout,
  Header,
  Button,
} from "../components";
import React, { useState } from "react";
import { login } from "../helpers";
import { Title } from "../types";
import { useRouter } from "next/router";
import Head from "next/head";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<Title>("Welcome");
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const requestBody = {
      email: email,
      password: password,
    };
    try {
      const res = await login(requestBody);
      if (res.status === 200) await router.push("/");
    } catch (error) {
      setTitle(error.response.data.errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <Header />
        <MainContainer title={title}>
          <FormLayout onSubmit={signIn}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput
              className={"row-start-2"}
              onChange={setPassword}
              value={password}
            />
            <Link href={"/forgot-password"}>
              <a className="col-span-2 hover:text-gray-500">
                <ExclamationCircleIcon className="h-6 w-6 ml-1 inline-block" />
                Forgot password
              </a>
            </Link>
            <Button clickHandler={signIn}>Log in</Button>
          </FormLayout>
        </MainContainer>
      </Layout>
      <Footer />
    </>
  );
};

export default LoginPage;
