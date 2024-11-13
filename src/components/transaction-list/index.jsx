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
  console.log("transaction nek: ", transactions);
  const columns = [
    {
      title: "ID",
      dataIndex: "transId",
      key: "transId",
      width: "5em",
    },
    {
      title: "TYPE",
      dataIndex: "transType",
      key: "transType",
      render: (transType) => <Text strong>{checkTransType(transType)}</Text>,
      width: "12em",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text strong className={checkStatus(status)}>
          {checkStatus(status)}
        </Text>
      ),
      width: "10em",
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      align: "left",
      render: (amount) => <Text strong>{amount?.toLocaleString()} VND</Text>,
      width: "15em",
    },
    {
      title: "BALANCE BEFORE",
      dataIndex: "balanceBefore",
      key: "balanceBefore",
      align: "left",
      render: (balanceBefore) => (
        <Text strong>{balanceBefore?.toLocaleString()} VND</Text>
      ),
      width: "15em",
    },
    {
      title: "BALANCE AFTER",
      dataIndex: "balanceAfter",
      key: "balanceAfter",
      align: "left",
      render: (balanceAfter) => (
        <Text strong>{balanceAfter?.toLocaleString()} VND</Text>
      ),
      width: "15em",
    },

  ];

  // Conditionally add the description column if transType is 'Withdraw'
  if (transactions.some((trans) => trans.transType === "Withdraw")) {
    columns.push({
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (description) => <Text>{description}</Text>,
    }); // {{ edit_2 }}: Push description column into columns array
  }
  columns.push({
    title: "TIME",
    dataIndex: "time",
    key: "time",
    align: "left",
    render: (time) => <Text strong>{time?.toLocaleString()} VND</Text>,
    width: "15em",
  });

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      pagination={false}
      showHeader={true}
      scroll={{ y: 400 }}
    />
  );
};

export default TransactionList;
