import "../styles/globals.css";
import AuthProvider from "../context/Auth";
import Router from "next/router";
import { useEffect, useState } from "react";
import { InfinitySpin, Circles } from "react-loader-spinner";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <AuthProvider>
      {!loading && <Component {...pageProps} />}
      {loading && <Circles wrapperClass="flex justify-center align-center" />}
    </AuthProvider>
  );
}

export default MyApp;
