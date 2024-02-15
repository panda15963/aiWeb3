import React, { ReactNode } from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document({children}: { children: ReactNode }) {
  return (
    <Html lang="en">
      <Head />
      <body>
        {children}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
