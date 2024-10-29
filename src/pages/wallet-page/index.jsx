import React, { useEffect, useState } from "react";
import { Card, Space } from "antd";
import YourWallet from "../../components/your-wallet";
import TransactionList from "../../components/transaction-list";
import paymentApi from "../../config/paymentApi";

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchBalance = async () => {
    try {
      const response = await paymentApi.get("/get-wallet-balance");
      setBalance(response.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await paymentApi.get("/get-transaction-history");
      const formattedTransactions = response.data.map(trans => ({
        key: trans.TransId,
        status: trans.StatusId === 1 ? "Pending" : "Completed",
        transId: trans.TransId,
        balanceAfter: trans.BalanceAfter,
        amount: trans.Amount,
      }));
      setTransactions(formattedTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex", padding: "24px" }}
    >
      <Card>
        <YourWallet balance={balance} />
      </Card>
      <Card>
        <TransactionList transactions={transactions} />
      </Card>
    </Space>
  );
};

export default WalletPage;
