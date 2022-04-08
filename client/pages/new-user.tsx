import React, { useContext, useState } from "react";
import {
  Button,
  EmailInput,
  FormLayout,
  Header,
  Layout,
  Main,
  PasswordInput,
} from "../components";
import { registration } from "../requests";
import { useRouter } from "next/router";
import { AuthContext } from "../context/Auth";

const NewUser = () => {
  const { setUserEmail } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };
    const res = await registration(requestBody);
    if (res.status === 201) {
      setUserEmail(res.data.user.email);
      await router.push("/");
    } else return "You are already authorized";
  };

  return (
    <Layout>
      <Header />
      <Main title={"Register"}>
        <FormLayout userAuth registration onSubmit={register}>
          <EmailInput onChange={setEmail} value={email} />
          <PasswordInput onChange={setPassword} value={password} />
        </FormLayout>
      </Main>
    </Layout>
  );
};

export default NewUser;
