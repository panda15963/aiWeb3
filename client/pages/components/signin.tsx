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

// Process.env variable is used for environment variables.
// INFURA_ID is the Infura key for connecting to the Ethereum network.
const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_KEY;

/**
* SignIn component displays a button to connect a user's wallet.
* It also shows the user's address and a disconnect button when the user is connected.
*/
const SignIn = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const { user, login, logout } = useUser();

  /**
   * Disconnects the user from the wallet and clears the user's address in the context.
   */
  const disconnect = async () => {
    setProvider(undefined);
    logout();
  };

  /**
   * Connects the user to a wallet. It checks for MetaMask, Coinbase Wallet, or WalletConnect.
   */
  const connect = async () => {
    try {
      setLoading(true);
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask");
      } else if (window.ethereum) {
        // Configure the provider options for MetaMask, Coinbase Wallet, and WalletConnect
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
              infuraId: INFURA_ID,
            },
          },
        };

        // Request user's accounts from MetaMask, Coinbase Wallet, or WalletConnect
        const provider = await window.ethereum.request({
          method: "eth_requestAccounts",
          cachesProvider: true,
          providerOptions,
        });

        // If the provider is available, set it in state and get the user's address
        if (provider) {
          setProvider(provider);
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = ethersProvider.getSigner();
          const address = await signer.getAddress();
          setProvider(provider);
          login(address);
        } else {
          // If the provider is not available, use Web3Modal to connect to the wallet
          const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
            providerOptions,
          });
          const provider = await web3Modal.connect();
          setProvider(provider);
          const ethersProvider = new ethers.providers.Web3Provider(provider);
          const signer = ethersProvider.getSigner();
          const address = await signer.getAddress();
          setProvider(provider);
          login(address);
          provider.on("accountsChanged", (accounts: string[]) => {
            login(accounts[0]);
          });
        }
      }
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
            <Dropdown className="bg-white rounded shadow-md">
              <DropdownTrigger>
                <Button className="relative flex items-center justify-center bg-sky-600 hover:bg-sky-900 rounded">                  
                  <p className="text-white font-bold tracking-wide px-2">
                    Welcome, {user.slice(0, 6)}...{user.slice(-6)} User!
                  </p>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  href="/components/accounts"
                  className="text-center block mb-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded font-bold"
                >
                  Account
                </DropdownItem>
                <DropdownItem
                  onClick={disconnect}
                  className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded font-bold"
                >
                  Disconnect
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
