import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

function BidMethodInfo({bidMethodInfo, size}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => setIsModalVisible(false);
  const handleCancel = () => setIsModalVisible(false);

  const checkBidMethodInfo = () => {
    const listStyle = {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    };

    const listItemStyle = {
      marginBottom: '10px',
    };

    switch(bidMethodInfo) {
      case 1:
        return (
          <div>
            <Title level={3}>Method 1: Fixed Price</Title>
            <ul style={listStyle}>
              <li style={listItemStyle}><Text>💰 Price is set in advance, no changes</Text></li>
              <li style={listItemStyle}><Text>👤 One buyer? Immediate transaction!</Text></li>
              <li style={listItemStyle}><Text>👥 Multiple buyers? Fair random selection</Text></li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            <Title level={3}>Method 2: Sealed Bid Auction</Title>
            <ul style={listStyle}>
              <li style={listItemStyle}><Text>🕵️ Place bid once, completely confidential</Text></li>
              <li style={listItemStyle}><Text>🔒 Bids remain secret until the end</Text></li>
              <li style={listItemStyle}><Text>🏆 Highest bidder wins</Text></li>
            </ul>
          </div>
        );
      case 3:
        return (
          <div>
            <Title level={3}>Method 3: Ascending Auction</Title>
            <ul style={listStyle}>
              <li style={listItemStyle}><Text>🔁 Place bids multiple times, no limit</Text></li>
              <li style={listItemStyle}><Text>📊 Bidding information is public</Text></li>
              <li style={listItemStyle}><Text>🥇 Highest bidder at the end wins</Text></li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div>
            <Title level={3}>Method 4: Descending Auction</Title>
            <ul style={listStyle}>
              <li style={listItemStyle}><Text>⏳ Starts high, price automatically decreases</Text></li>
              <li style={listItemStyle}><Text>⚡ First to accept the current price wins</Text></li>
              <li style={listItemStyle}><Text>👀 Watch closely, don't miss your chance!</Text></li>
            </ul>
          </div>
        );
      default:
        return (
          <div>
            <Title level={3}>Bidding Method Information</Title>
            <Paragraph>Please select a bidding method to view detailed information.</Paragraph>
          </div>
        );
    }
  }

  return (
    <div>
      <Button
        icon={<InfoCircleOutlined />}
        onClick={showModal}
        shape="circle"
        size={size}
      />
      <Modal
        title={<Title level={3} style={{ margin: 0 }}>Bidding Method Information</Title>}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleOk} type="dashed">
            Close
          </Button>,
        ]}
      >
        {checkBidMethodInfo()}
      </Modal>
    </div>
  );
}

export default BidMethodInfo;
