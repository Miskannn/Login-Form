import {
  EmailInput,
  Button,
  Footer,
  PasswordInput,
  Main as MainContainer,
  FormLayout,
  Layout,
  Header,
} from "../components";
import { useState } from "react";
import { router } from "next/client";
import { useRouter } from "next/router";

const Main = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<"text" | "password">("password");
  const [title, setTitle] = useState<"Welcome" | "Wrong password" | "Oops">(
    "Welcome"
  );
  const router = useRouter();

  const titleHandler = () => {};

  const formSubmit = async (e: Event) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    await router.push("/dashboard");
  };

  return (
    <>
      <Layout>
        <Header />
        <MainContainer title={title}>
          <FormLayout userAuth onSubmit={formSubmit}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput
              onChange={setPassword}
              value={password}
              type={type}
              setType={setType}
            />
          </FormLayout>
        </MainContainer>
        <Footer />
      </Layout>
    </>
  );
};

export default Main;
