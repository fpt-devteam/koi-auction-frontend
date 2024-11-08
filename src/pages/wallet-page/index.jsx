import React, { useEffect, useState } from "react";
import { Card, Space, Spin } from "antd";
import YourWallet from "../../components/your-wallet";
import TransactionList from "../../components/transaction-list";
import paymentApi from "../../config/paymentApi";
import { useSelector } from "react-redux";

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [seed, setSeed] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((store) => store.user);

  const handleRefresh = () => {
    setSeed(seed + 1);
  };

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
        status: trans.Status,
        transId: trans.TransId,
        balanceAfter: trans.BalanceAfter,
        amount: trans.Amount,
        transType: trans.TransType,

        // walletId: trans.WalletId,
      }));
      console.log("formattedTransactions", formattedTransactions)
      setTransactions(formattedTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
      setLoading(false);
    }
  }, [user, seed]);

  return loading ? (
    <Spin />
  ) : (
    <Space
      key={seed}
      direction="vertical"
      size="large"
      style={{ display: "flex", padding: "24px" }}
    >
      <Card>
        <YourWallet balance={balance} refresh={handleRefresh} user={user} />
      </Card>
      <Card>
        <TransactionList transactions={transactions} user={user} />
      </Card>
    </Space>
  );
};

export default WalletPage;
