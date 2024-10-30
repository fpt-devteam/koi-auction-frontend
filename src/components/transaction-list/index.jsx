import React from 'react';
import { Table, Typography, Space } from 'antd';

const { Text } = Typography;

const TransactionList = ({ transactions }) => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'transId',
      key: 'transId',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount) => (
        <Text strong>{amount.toLocaleString()} VND</Text>
      ),
    },
    {
      title: 'BALANCE AFTER',
      dataIndex: 'balanceAfter',
      key: 'balanceAfter',
      align: 'right',
      render: (balance) => (
        <Text strong>{balance.toLocaleString()} VND</Text>
      ),
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
