import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en" className="h-full text-base md:text-xl xl:text-2xl">
      <Head>
        <title>Abler</title>
      </Head>
      <body className="h-full flex flex-col justify-between focus:text-gray-10">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
