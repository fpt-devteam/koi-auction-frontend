import React from 'react';
import { Avatar, Button, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

function YourWallet({balance}) {
  return (
    <Space direction="vertical" size="large" style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar 
        size={100} 
        icon={<UserOutlined />}
        style={{ backgroundColor: '#ffc0cb' }}
      />
      <Space>
        <Button type="default" size="large">Deposit</Button>
        <Button type="default" size="large">Withdrawal</Button>
      </Space>
      <Title level={1} style={{ margin: 0 }}>{balance}</Title>
    </Space>
  )
}

export default YourWallet