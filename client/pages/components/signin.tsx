import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useUser } from "./context/UserContext";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_KEY;
const SignIn = () => {
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useUser();
  const disconnect = async () => {
    setProvider(undefined);
    logout();
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
          coinbaseWallet: {
            package: CoinbaseWalletSDK,
            options: {
              appName: "Next.js Dapp",
              network: "mainnet",
            },
          },        
        };
        const provider = await window.ethereum.request({
          method: "eth_requestAccounts",
          cachesProvider: true,
          providerOptions
        });
        if (provider) {
          setProvider(provider);
        } else {
          const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions,
          });
          const provider = await web3Modal.connect();
          setProvider(provider);
        }
        setProvider(provider);
      }
      // Get the ethers provider
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

      // Get the signer from the ethers provider
      const signer = ethersProvider.getSigner();

      // Get the connected wallet's address
      const address: any = await signer.getAddress();
      setProvider(provider);
      login(address);
    } catch (error: any) {
      setLoading(false);
      alert(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        {user ? (
          <>
            {loading === true ? (
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button className="relative flex items-center justify-center bg-sky-600 hover:bg-sky-900">
                    <img
                      src="https://avatars.githubusercontent.com/u/37784886"
                      className="h-10 w-10 rounded-full"
                    />
                    <p className="text-white font-bold tracking-wide px-2">
                      {user.slice(0, 6)}...{user.slice(-6)}
                    </p>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    href="/components/accounts"
                    className="text-center py-2 block px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="font-bold">Account</div>
                  </DropdownItem>
                  <DropdownItem
                    onClick={disconnect}
                    className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <div className="font-bold">Disconnect</div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded hover: cursor-pointer justify-center item-center">
                <div className="pl-2">
                  <Spinner size="sm" className="mr-2" />
                  Loading...
                </div>
              </Button>
            )}
          </>
        ) : (
          <>
            <Button
              className="bg-sky-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded hover: cursor-pointer justify-center item-center"
              onClick={connect}
            >
              Connect
            </Button>
          </>
        )}
      </div>
    </>
  );
};
export default SignIn;
