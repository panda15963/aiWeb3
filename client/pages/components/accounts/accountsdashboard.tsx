import React, { FC, useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../navbar";
import { useUser } from "../context/UserContext";
import axios from "axios";

const AccountsDashboard: FC = () => {
  const { user } = useUser();
  axios.get("http://localhost:8000/api/accounts").then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
  return (
    <div>
      <Navbar />
      
      <Footer />
    </div>
  );
};

export default AccountsDashboard;