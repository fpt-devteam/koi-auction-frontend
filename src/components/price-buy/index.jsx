import React from "react";
import { Input, Button, Row, Col, Card } from "antd";

const PriceBuy = ({ onBuySubmit, price }) => {
  const handleBuySubmit = (price) => () => {
    onBuySubmit(price);
  };

  return (
    <Card
      style={{
        padding: "12px",
        borderRadius: "10px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={16} align="middle">
        <Col span={16}>
          <Input
            size="large"
            value={price.toLocaleString() + " VND"}
            disabled
            style={{
              borderRadius: "5px",
              fontSize: "1.2rem",
              color: "red",
              fontWeight: "bold",
            }}
          />
        </Col>

        <Col span={8}>
          <Button
            type="primary"
            size="large"
            onClick={handleBuySubmit(price)}
            style={{
              width: "100%",
              borderRadius: "5px",
              fontSize: "1.2rem",
            }}
          >
            Buy now
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default PriceBuy;
