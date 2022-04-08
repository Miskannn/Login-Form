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

const Main = () => {
  const { setUserEmail } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<"Welcome" | "Wrong password" | "Oops">(
    "Welcome"
  );
  const router = useRouter();

  const titleHandler = () => {};

  const signIn = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const requestBody = {
      email: email,
      password: password,
    };
    const res: any = await login(requestBody);
    if (res.status === 200) {
      setUserEmail(res.data.user.email);
      await router.push("/");
    } else return "You are already authorized";
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
        <Footer />
      </Layout>
    </>
  );
};

export default Main;
