import { Button, Header } from "../components";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/Auth";
import { getUserInfo, logout } from "../helpers";
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();
  const { userEmail, setUserEmail } = useContext(AuthContext);

  const logoutHandler = async () => {
    await logout();
  };

  useEffect(() => {
    getUserInfo()
      .then((email) => setUserEmail(email))
      .catch(() => router.push("/login"));
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header className="mt-10" />
      <div className="px-5 text-center mt-10">
        <h1 className="text-3xl font-medium lg:text-4xl xl:text-5xl">
          Welcome!
        </h1>
        {userEmail && (
          <h2 className="text-lg lg:text-xl xl:text-2xl mt-3">
            Your email is {userEmail}
          </h2>
        )}
        {userEmail && (
          <Button className="mt-5" clickHandler={logoutHandler}>
            Log Out
          </Button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
