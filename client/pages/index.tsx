import { Button, Header } from "../components";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../context/Auth";
import { accessControl } from "../requests";
import { GetServerSideProps } from "next";
import { AxiosResponse } from "axios";

const Dashboard = () => {
  const router = useRouter();
  const { userEmail } = useContext(AuthContext);

  // useEffect(() => {
  //   try {
  //     accessControl().then((code: AxiosResponse<string>) => {
  //       if (typeof code === "string") {
  //         localStorage.setItem("access_code", code);
  //         console.log(localStorage.getItem("access_code"));
  //       }
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <>
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
        {userEmail && <Button className="mt-5">Log Out</Button>}
        {!userEmail && (
          <div className="flex justify-center items-center flex-col">
            <Button
              clickHandler={() => router.push("/login")}
              className={"mt-12"}
            >
              Log in
            </Button>
            <Button
              clickHandler={() => router.push("/new-user")}
              className={"mt-12"}
            >
              Registration
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  return { props: {} };
};

export default Dashboard;
