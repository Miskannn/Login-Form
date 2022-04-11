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
import jwtDecode from "jwt-decode";
import { accessControl, registration } from "../requests";
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
      const code = res.data.access_code;
      const accessValidation = await accessControl({
        email: requestBody.email,
        access_code: code,
      });
      if (accessValidation.status === 200) {
        const decodedToken: any = jwtDecode(accessValidation.data.access_token);
        setUserEmail(decodedToken?.email);
        console.log(new Date(decodedToken.exp));
        localStorage.setItem(
          "access_token",
          accessValidation.data.access_token
        );
        await router.push("/");
      } else {
        return "Access-control error";
      }
    } else return "Something went wrong";
  };

  return (
    <>
      <Layout>
        <Header />
        <Main title={"Register"}>
          <FormLayout userAuth registration onSubmit={register}>
            <EmailInput onChange={setEmail} value={email} />
            <PasswordInput onChange={setPassword} value={password} />
          </FormLayout>
        </Main>
      </Layout>
    </>
  );
};

export default NewUser;
