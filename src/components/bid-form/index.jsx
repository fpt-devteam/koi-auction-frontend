import React from "react";
import { Input, Button, Row, Col, Card } from "antd";
import { Modal } from "antd";

const BidForm = ({ onBidSubmit }) => {
  const [bidAmount, setBidAmount] = React.useState("");

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBidSubmit = () => {
    //modal are you sure you want to place this bid?
    Modal.confirm({
      title: "Confirm Bid",
      content: "Are you sure you want to place this bid?",
      onOk() {
        onBidSubmit(bidAmount);
      },
      onCancel() {
        console.log("Cancel");
      },
    });

    onBidSubmit(bidAmount);
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
        {/* Input for new bid */}
        <Col span={16}>
          <Input
            size="large"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={handleBidChange}
            style={{ borderRadius: "5px", fontSize: "1.2rem" }}
          />
        </Col>

        {/* Button to submit bid */}
        <Col span={8}>
          <Button
            type="primary"
            size="large"
            onClick={handleBidSubmit}
            style={{
              width: "100%",
              borderRadius: "5px",
              fontSize: "1.2rem",
            }}
          >
            Place Bid
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default BidForm;
