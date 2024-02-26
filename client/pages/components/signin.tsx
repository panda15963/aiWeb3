import React from "react";
import axios from "axios";
const addresses = {
  metamask: "0x817fAC4C57246d2e1d1B936a194439180d1980a3",
  coinbase: "0x6DDCbFDA277c76Cb7102924e584E49A606B8E942",
}
const SignIn = () => {
  const address = addresses.metamask;
  const apiKey = process.env.NEXT_PUBLIC_TOKEN_KEY || "";
  const getEtherData = async (address: string, apiKey: string) => {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
      ).then((res) => res).catch((err) => console.log(err));
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching Ether balance:", error);
      throw error;
    }
  }
  const etherData = getEtherData(address, apiKey);
  console.log(etherData);
  return (
    <>
      <w3m-account-button balance="show" />
    </>
  );
};

export default SignIn;
