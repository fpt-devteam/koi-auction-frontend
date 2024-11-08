import React from 'react';
import { Card, Typography, Row, Col, Image } from 'antd';

const { Title, Text } = Typography;

const BreederInfo = ({ breeder }) => {
  return (
    <div style={{margin: '0 auto' }}>
        <Row gutter={[16, 16]} align="middle" style={{marginBottom: "2%"}}>
          <Col span={6}>
            <Image
              src={breeder.Certificate} // Link đến ảnh logo từ `Certificate`
              alt="Breeder Logo"
              width={100}
              height={100}
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          </Col>
          <Col span={18}>
            <Title level={3}>{breeder.FarmName}</Title>
            <Text strong>Detail:</Text> <Text>{breeder.About}</Text>
            <br />
            <Text strong>Address:</Text> <Text>815 Mitsubuchi, Komaki-shi, Aichi, Japan</Text>
            <br />
            <Text strong>Variety:</Text> <Text>All Variety</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]} align="left" style={{marginBottom: "2%"}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam animi earum commodi porro temporibus dolor vitae similique, qui doloribus? Est facilis rem eaque dolore quaerat neque illo voluptate asperiores eveniet.
            Debitis repellendus dignissimos aliquam sint harum molestiae consequatur cumque? Velit delectus pariatur, repudiandae ex maxime, obcaecati a, aut nemo totam repellat voluptas! At earum dicta esse quisquam id repellat quae.
            Eius culpa fugit, odit dolor error at quasi, voluptatibus, sit hic placeat distinctio? Ipsa perferendis perspiciatis quibusdam, nemo voluptatum rem vel distinctio aliquam? Rem quibusdam at magnam eos minima eligendi.
        </Row>
    </div>
  );
};

export default BreederInfo;
