import {
  EmailInput,
  Footer,
  PasswordInput,
  Main as MainContainer,
  FormLayout,
  Layout,
  Header,
} from "../components";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { login } from "../requests";
import { AuthContext } from "../context/Auth";
import { accessControlValidation } from "../helpers/authHelper";

const LoginPage = () => {
  const { setUserEmail } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<"Welcome" | "Wrong password" | "Oops">(
    "Welcome"
  );
  const router = useRouter();

  const signIn = async (e) => {
    e.preventDefault();
    const loginBody = {
      email: email,
      password: password,
    };
    const res = await login(loginBody);
    if (res.status === 200) {
      const code: string = res.data.access_code;
      const accessControl = await accessControlValidation(
        loginBody,
        code,
        setUserEmail
      );
      if (accessControl) {
        await router.push("/");
      }
    } else {
      setTitle("Oops");
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
