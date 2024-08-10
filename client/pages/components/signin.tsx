import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useUser } from "./context/UserContext";
import Link from "next/link";

/**
* SignIn component displays a button to connect a user's wallet.
* It also shows the user's address and a disconnect button when the user is connected.
*/
export default function SignIn() {
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
          cacheProvider: true
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
                  textValue="Account"
                  className="text-center block mb-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded font-bold"
                >
                  <Link href="/components/accounts/accountsdashboard">
                    Account
                  </Link>
                </DropdownItem>
                <DropdownItem
                  textValue="Disconnect"
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