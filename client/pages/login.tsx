import {
  EmailInput,
  Footer,
  PasswordInput,
  Main as MainContainer,
  FormLayout,
  Layout,
  Header,
} from "../components";
import { useState } from "react";
import { login } from "../helpers";
import { Title } from "../types";
import { router } from "next/client";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<Title>("Welcome");

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
      <Layout>
        <Header />
        <MainContainer title={title}>
          <FormLayout userAuth onSubmit={(e) => signIn(e)} registration={false}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput onChange={setPassword} value={password} />
          </FormLayout>
        </MainContainer>
      </Layout>
      <Footer />
    </>
  );
};

export default LoginPage;
