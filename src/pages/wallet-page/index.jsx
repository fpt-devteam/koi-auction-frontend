import React from 'react';
import { Card, Space } from 'antd';
import YourWallet from '../../components/your-wallet';
import TransactionList from '../../components/transaction-list';

const WalletPage = () => {
  const balance = '500.00$';
  const transactions = [
    { key: 1, status: 'Sending', icon: '↗', total: '-$5,135.76', currency: '24,456 GNO' },
    { key: 2, status: 'Sent', icon: '↑', total: '-$3,858.64', currency: '1,649 ANT' },
    { key: 3, status: 'Received', icon: '↓', total: '$3,778.02', currency: '4.17 ETH' },
    { key: 4, status: 'Received', icon: '↓', total: '$1,763.98', currency: '1,982 DNT' },
  ];

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex', padding: '24px' }}>
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
