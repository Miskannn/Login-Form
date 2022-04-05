import Head from "next/head";
import { Button, Header } from "../components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    email: "",
  });

  const logout = async () => {
    await router.push("/forgot-password");
  };

  return (
    <>
      <Header className="mt-10" />
      <div className="px-5 text-center mt-10">
        <h1 className="text-3xl font-medium lg:text-4xl xl:text-5xl">
          Welcome, {user.userName}
        </h1>
        <h2 className="text-lg lg:text-xl xl:text-2xl mt-3">
          Your email is {user.email}
        </h2>
        <Button className="mt-5" clickHandler={logout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
