import { Button, Header } from "../components";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/Auth";
import jwtDecode from "jwt-decode";
import { IDecodedToken } from "../types/DecodedToken";
import { logout } from "../helpers/authHelper";

const Dashboard = () => {
  const router = useRouter();
  const { userEmail, setUserEmail } = useContext(AuthContext);

  const logoutHandler = async () => {
    setUserEmail(null);
    await logout();
  };

  useLayoutEffect(() => {
    try {
      const decodedToken: IDecodedToken = jwtDecode(
        localStorage.getItem("access_token")
      );
      if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
        setUserEmail(decodedToken.email);
      } else {
        router.push("/login");
      }
    } catch (e) {
      router.push("/login");
    }
  }, []);

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
        {userEmail && (
          <Button clickHandler={logoutHandler} className="mt-5">
            Log Out
          </Button>
        )}
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

export default Dashboard;
