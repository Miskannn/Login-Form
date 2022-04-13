import "../styles/globals.css";
import AuthProvider from "../context/Auth";
import { Head } from "next/document";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </>
  );
}

export default MyApp;
