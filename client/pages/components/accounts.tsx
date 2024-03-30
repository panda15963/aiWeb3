import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
const accounts = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-sky-100">
        <h1 className="text-5xl text-sky-600 font-bold">Accounts</h1>
      </div>
      <Footer />
    </>
  );
};
export default accounts;