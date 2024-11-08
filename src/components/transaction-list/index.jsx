import React from "react";
import { Table, Typography, Space } from "antd";
import "./index.css";

const { Text } = Typography;
const checkTransType = (transType) => {
  // switch (transType) {
  //   case 1:
  //     return "Deposit";
  //   case 2:
  //     return "Withdrawal";
  //   case 3:
  //     return "Payment";
  //   case 4:
  //     return "Refund";
  // }
  return transType;
};
const checkStatus = (status) => {
  // switch (status) {
  //   case 1:
  //     return "Pending";
  //   case 2:
  //     return "Success";
  //   case 3:
  //     return "Failed";
  // }
  return status;
};

const TransactionList = ({ transactions }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "transId",
      key: "transId",
    },
    {
      title: "TYPE",
      dataIndex: "transType",
      key: "transType",
      render: (transType) => <Text strong>{checkTransType(transType)}</Text>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => <Text strong className={checkStatus(status)}>{checkStatus(status)}</Text>,
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount) => <Text strong>{amount?.toLocaleString()} VND</Text>,
    },
    {
      title: "BALANCE AFTER",
      dataIndex: "balanceAfter",
      key: "balanceAfter",
      align: "right",
      render: (balance) => <Text strong>{balance?.toLocaleString()} VND</Text>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      pagination={false}
      showHeader={true}
    />
  );
};

export default TransactionList;
