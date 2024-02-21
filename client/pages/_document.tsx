import React, { ReactNode } from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document({children}: { children: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <title>GENAIMAGE</title>
      <body>
        {children}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
