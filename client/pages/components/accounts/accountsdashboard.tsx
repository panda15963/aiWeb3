import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navbar from '../navbar';
import Footer from '../Footer';

const TransactionAccountPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransactionHistory = async () => {
    try {
      // Get the user's Ethereum address from MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Transaction Account Page</h1>
        {loading ? (
          <p>Loading transaction history...</p>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
            <ul className="list-disc pl-6">
            </ul>
          </div>
        )}
        {/* Add UI elements for transaction functionality */}
        {/* For example: */}
        {/* Input fields for recipient address and amount */}
        {/* Button to send transaction */}
      </div>
      <Footer />
    </>
  );
};

export default TransactionAccountPage;
