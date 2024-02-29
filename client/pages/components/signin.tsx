import React, { useState } from "react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import { IoClose } from "react-icons/io5";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Link from "next/link";
import { useUser } from "./context/UserContext";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_KEY;
const SignIn = () => {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [library, setLibrary] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [account, setAccount] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [close, setClose] = useState(false);
  const { login } = useUser();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleClose = () => {
    setClose(!close);
    setIsDropdownOpen(false);
  };
  const disconnect = async () => {
    setAccount(undefined);
    setProvider(undefined);
    setLibrary(undefined);
    login(undefined);
  };
  const connect = async () => {
    try {
      setLoading(true);
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      } else if (window.ethereum) {
        const providerOptions = {
          walletconnect: {
            package: WalletConnect,
            options: {
              infuraId: INFURA_ID,
            },
          },
          coinbasewallet: {
            package: CoinbaseWalletSDK,
            options: {
              appName: "Web 3 Modal Demo",
              infuraId: INFURA_ID,
            },
          },
        };
        const web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions,
        });
        const provider = await web3Modal.connect();
        setProvider(provider);
      }
      // Get the ethers provider
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer from the ethers provider
      const signer = ethersProvider.getSigner();

      // Get the connected wallet's address
      const address: any = await signer.getAddress();

      // Convert the balance from wei to ether
      const balanceEther = ethers.utils.formatEther(
        await ethersProvider.getBalance(address)
      );
      setBalance(balanceEther);
      setProvider(provider);
      setLibrary(ethersProvider);
      setAccount(address);
      login(address);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        {account ? (
          <>
            <button
              onClick={toggleDropdown}
              className="relative flex items-center"
            >
              <img
                src="https://avatars.githubusercontent.com/u/37784886"
                className="h-10 w-10 rounded-full"
              />
              <p className="text-white font-bold tracking-wide px-2">
                {account.slice(0, 6)}...{account.slice(-6)}
              </p>
            </button>
            {isDropdownOpen && (
              <div className="text-right absolute mt-40 w-48  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button
                    className="text-left px-4 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={toggleClose}
                  >
                    <IoClose />
                  </button>
                  <Link
                    href="/components/Profile"
                    className="text-center block px-4 py-1 text-sm pr-2 font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={disconnect}
                    className="text-center block pl-16 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover: cursor-pointer justify-center item-center"
              onClick={connect}
            >
              Connect
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default SignIn;
