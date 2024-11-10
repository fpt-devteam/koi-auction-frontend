import React from 'react';
import { Card, Typography, Row, Col, Image } from 'antd';

const { Title, Text } = Typography;

const BreederInfo = ({ breeder }) => {
  return (
    <div style={{ margin: '0 auto' }}>
      <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '2%' }}>
        <Col span={10} style={{ marginRight: '30px' }}>
          <Image
            src={breeder.Certificate} // Link đến ảnh logo từ `Certificate`
            alt="Breeder Logo"
            width={'100%'}
            height={'100%'}
            style={{ objectFit: 'cover' }}
          />
        </Col>
        <Col span={8}>
          <Title
            level={1}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'red',
              textDecorationThickness: '4px',
              textUnderlineOffset: '8px' // adjust this value to increase/decrease the gap
            }}
          >
            {breeder.FarmName}
          </Title>
          <br />
          <Text strong style={{ fontSize: '16px' }}>
            About us:
          </Text>{' '}
          <Text>{breeder.About}</Text>
          <br />
          <Text strong style={{ fontSize: '16px' }}>
            Address:
          </Text>{' '}
          <Text>815 Mitsubuchi, Komaki-shi, Aichi, Japan</Text>
          <br />
          <Text strong style={{ fontSize: '16px' }}>
            Variety:
          </Text>{' '}
          <Text>All Variety</Text>
        </Col>
      </Row>
      <Row
        className="breeder-info-description"
        gutter={[16, 16]}
        align="left"
        style={{
          marginBottom: '2%',
          padding: '20px',
          textAlign: 'justify',
          lineHeight: '1.6',
          fontSize: '16px',
          backgroundColor: '#f4f4f5', // light grey background
          borderRadius: '2px' // rounded corners
        }}
      >
        {breeder.About}
      </Row>
    </div>
  );
};

export default BreederInfo;
