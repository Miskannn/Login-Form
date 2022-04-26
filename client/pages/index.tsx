import { Button, Header } from "../components";
import { useEffect, } from "react";
import { useRouter } from "next/router";
import { getUserInfo, logout } from "../api/auth";
import Head from "next/head";
import { useAuth } from "../hooks";
import clsx from "clsx";

const Dashboard = () => {
  const router = useRouter();
  const { userEmail, setUserEmail } = useAuth();

  const logoutHandler = async () => {
    const res = await logout();
    if (res.status === 200) return router.push("/login");
  };

  const fetchUserInfo = async () => {
    try{
      const res = await getUserInfo();
      typeof res === "string" ? setUserEmail(res) : null;
    }catch{
      await router.push("/login")
    }
    return () => {
      setUserEmail("");
    }
  }

  useEffect(() => {
    void fetchUserInfo()
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header className="mt-10" />
      <div className={clsx("px-5 lg:w-[386px] mx-auto text-center", { "mt-20": !userEmail, "mt-10": userEmail })}>
        <h1 className="text-3xl font-medium">
          Welcome!
        </h1>
        {userEmail && (
          <h2 className="text-lg lg:text-xl xl:text-xl  mt-3">
            Your email is: <br/>
            {userEmail}
          </h2>
        )}
        {userEmail && (
          <Button className={"mt-5"} clickHandler={logoutHandler}>
            Log Out
          </Button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
