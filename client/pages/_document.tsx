import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' className='h-full text-base md:text-xl xl:text-xl'>
    <Head/>
    <body className="h-full flex flex-col justify-between focus:text-gray-10">
      <Main />
    <NextScript />
    </body>
    </Html>
)
}
