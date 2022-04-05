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

const Main = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<"text" | "password">("password");
  const [title, setTitle] = useState<"Welcome" | "Wrong password" | "Oops">(
    "Welcome"
  );
  return (
    <>
      <Layout>
        <Header />
        <MainContainer title={title}>
          <FormLayout>
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
