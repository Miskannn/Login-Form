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
import React, { FormEvent, useState } from "react";
import { login } from "../api/auth";
import { useRouter } from "next/router";
import Head from "next/head";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import axios, { AxiosError } from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState("Welcome");
  const router = useRouter();

  const signIn = async (e: FormEvent) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const requestBody = {
      email: email,
      password: password,
    };
    try {
      const res = await login(requestBody);
      if (res.status === 200) return router.push("/");
    } catch (error: unknown) {
      axios.isAxiosError(error)
        ? setTitle((error?.response?.data as AxiosError)?.message)
        : setTitle("Something went wrong")
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Layout>
        <Header />
        <MainContainer className="lg:mt-[2px]" title={title}>
          <FormLayout onSubmit={signIn}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput
              onChange={setPassword}
              value={password}
            />
            <Link href={"/forgot-password"}>
              <a className="col-span-2 hover:text-gray-500">
                <ExclamationCircleIcon className="h-6 w-6 ml-1 inline-block" />
                Forgot password
              </a>
            </Link>
            <Button isError={title !== "Welcome"}>Log in</Button>
          </FormLayout>
        </MainContainer>
      </Layout>
      <Footer />
    </>
  );
};

export default LoginPage;
