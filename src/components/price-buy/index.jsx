import React, { useState } from "react";
import { Input, Button, Row, Col, Card, Modal } from "antd";
const PriceBuy = ({ onBuySubmit, price }) => {
  if (!price) {
    return null;
  }
  const handleBuySubmit = (price) => () => {
    //are you sure you want to buy this product?
    Modal.confirm({
      title: "Are you sure you want to buy this item?",
      content: "This action cannot be undone.",
      okText: "Yes, Buy",
      cancelText: "Cancel",
      onOk() {
        // Perform the buying action here, e.g., call an API or update state
        onBuySubmit(price);
      },
      onCancel() {},
    });
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
