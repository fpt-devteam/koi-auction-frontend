import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { PictureOutlined, YoutubeOutlined } from '@ant-design/icons';

const BreederLotCard = ({ lot }) => {
  return (
    <Card
      style={{
        border: '2px solid #d9d9d9',
        marginBottom: '20px',
        //shadow
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        //background color
        backgroundColor: '#fafafa',
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <img
            src={lot.KoiMedia[0]?.filePath || 'default-placeholder.png'}
            alt="Koi Fish"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '5px',
            }}
          />
        </Col>
        <Col span={18}>
          <h3>{lot.Variety || 'Unknown Variety'}</h3>
          <p>
            {`Size: ${lot.SizeCm} cm | Year of Birth: ${lot.YearOfBirth} | Weight: ${lot.WeightKg} kg | Sex: ${lot.Sex ? 'Female' : 'Male'}`}
          </p>
          <h2 style={{ color: '#c00' }}>{`¥ ${lot.FinalPrice.toLocaleString()}`}</h2>
          <div>
            <Button
              icon={<PictureOutlined />}
              style={{ marginRight: '8px' }}
            >
              View
            </Button>
            {/* <Button icon={<YoutubeOutlined />}>Movie</Button> */}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default BreederLotCard;
