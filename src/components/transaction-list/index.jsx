import React from 'react';
import { Table, Typography, Space } from 'antd';

const { Text } = Typography;

const TransactionList = ({ transactions }) => {
  const columns = [
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Space>
          <Text>{text}</Text>
          <Text>{record.icon}</Text>
        </Space>
      ),
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (text, record) => (
        <Space direction="vertical" size={0} style={{ textAlign: 'right' }}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.currency}</Text>
        </Space>
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

