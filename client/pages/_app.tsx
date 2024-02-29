import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "./components/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </NextUIProvider>
    </>
  );
}
