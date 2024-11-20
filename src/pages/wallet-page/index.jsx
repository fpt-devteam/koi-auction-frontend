import React, { useEffect, useState } from "react";
import { Card, Space, Spin } from "antd";
import YourWallet from "../../components/your-wallet";
import TransactionList from "../../components/transaction-list";
import paymentApi from "../../config/paymentApi";
import { useSelector } from "react-redux";

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [withdraw, setWithdraw] = useState([]);
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
      // //console.log(error);
    }
  };

  const checkTrans = (trans) => {
    switch (trans.transType) {
      case "Deposit":
        if (trans.status === "Success") {
          trans.balanceAfter = trans.amount + trans.balanceBefore;
        } else {
          trans.balanceAfter = trans.balanceBefore;
        }
        break;
      case "Withdraw":
        if (trans.status === "Success") {
          trans.balanceAfter = trans.balanceBefore - trans.amount;
        } else {
          trans.balanceAfter = trans.balanceBefore;
        }
        break;
      case "Payment":
        if (trans.status === "Success") {
          trans.balanceAfter = trans.balanceBefore - trans.amount;
        } else {
          trans.balanceAfter = trans.balanceBefore;
        }
        break;
      case "Payout":
        if (trans.status === "Success") {
          trans.balanceAfter = trans.amount + trans.balanceBefore;
        } else {
          trans.balanceAfter = trans.balanceBefore;
        }
        break;
      case "Refund":
        if (trans.status === "Success") {
          trans.balanceAfter = trans.amount + trans.balanceBefore;
        } else {
          trans.balanceAfter = trans.balanceBefore;
        }
        break;
      default:
        trans.balanceAfter = trans.balanceBefore;
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await paymentApi.get("/get-transaction-history");
      const formattedTransactions = response.data
        .filter((x) => x.TransType !== "Withdraw")
        .sort((a, b) => b.TransId - a.TransId)
        .map((trans) => {
          const formattedTrans = {
            key: trans.TransId,
            status: trans.Status,
            transId: trans.TransId,
            balanceBefore: trans.BalanceBefore,
            amount: trans.Amount,
            transType: trans.TransType,
            description: trans.Description,
            balanceAfter: 0,
            time: trans.CreatedAt,
          };
          checkTrans(formattedTrans);
          return formattedTrans;
        });

      const withdraw = response.data
        .filter((x) => x.TransType === "Withdraw")
        .sort((a, b) => b.TransId - a.TransId)
        .map((trans) => {
          const formattedTrans = {
            key: trans.TransId,
            status: trans.Status,
            transId: trans.TransId,
            balanceBefore: trans.BalanceBefore,
            balanceAfter: 0,
            amount: trans.Amount,
            transType: trans.TransType,
            description: trans.Description,
            time: trans.CreatedAt,
          };
          checkTrans(formattedTrans);
          return formattedTrans;
        });

      setTransactions(formattedTransactions);
      setWithdraw(withdraw);
    } catch (error) {
      // //console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBalance();
      fetchTransactions();
      setLoading(false);
    }
  }, [user, seed]);

  return loading && balance != null ? (
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
      <Card
        title={<div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Transaction History</div>}
      >
        <TransactionList transactions={transactions} />
      </Card>
      <Card
        title={<div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Withdrawal History</div>}
      >
        <TransactionList transactions={withdraw} />
      </Card>
    </Space>
  );
};

export default WalletPage;
