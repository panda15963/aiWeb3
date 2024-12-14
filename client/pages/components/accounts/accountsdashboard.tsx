import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../Footer';
import { connectWallet, getModimBalance } from "@/utils/payment1"; // 외부 모듈에서 가져옴

export default function TransactionAccountPage() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // MetaMask 연결 상태 확인
  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]); // 이미 연결된 계정 설정
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  // 잔액 가져오기
  const fetchBalance = async () => {
    if (!userAddress) {
      console.error("Please connect your wallet first!");
      return;
    }

    try {
      const balance = await getModimBalance(userAddress); // 외부 함수 호출
      setBalance(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // 지갑 연결
  const connect = async () => {
    const address = await connectWallet();
    setUserAddress(address);
  };

  // 페이지 로드 시 연결 상태 확인 및 잔액 가져오기
  useEffect(() => {
    checkWalletConnection();
  }, []);

  // userAddress가 변경될 때 잔액 가져오기
  useEffect(() => {
    if (userAddress) {
      fetchBalance();
    }
  }, [userAddress]);

  return (
    <>
      <Navbar />
      {userAddress ? (
        <>
          <div className="m-8 border-1 border-black rounded-md overflow-hidden shadow-lg">
            <h1 className="text-3xl font-bold text-center m-4">Account</h1>
            <hr className="border-black" />
            <section className="flex flex-col gap-4 p-6 text-center">
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Address</h2>
                <p className="text-xl">{userAddress}</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Network</h2>
                <p className="text-xl">Sepolia</p>
              </div>
              <div className="border-1 border-black rounded-md overflow-hidden p-2">
                <h2 className="text-2xl font-bold">Balance</h2>
                <p className="text-xl">{balance} MODIM</p>
              </div>
            </section>
          </div >
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold">You are not connected to a wallet</h1>
          <p className="text-xl">Please connect to a wallet to view your account</p>
          <button
            onClick={connect}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Connect Wallet
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}
