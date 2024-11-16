import React from "react";
import { Input, Button, Row, Col, Card } from "antd";
import { Modal } from "antd";

const BidForm = ({ onBidSubmit }) => {
  const [bidAmount, setBidAmount] = React.useState("");
  const [bidAmountInput, setBidAmountInput] = React.useState("");

  const handleBidChange = (e) => {
    const value = e.target.value;

    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Format as Vietnamese currency
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericValue);
    setBidAmountInput(formattedValue);
    setBidAmount(numericValue);
  };

  const handleBidSubmit = () => {
    //modal are you sure you want to place this bid?
    // Modal.confirm({
    //   title: "Confirm Bid",
    //   content: "Are you sure you want to place this bid?",
    //   onOk() {
    //     onBidSubmit(bidAmount);
    //   },
    //   onCancel() {
    //     console.log("Cancel");
    //   },
    // });
    console.log("Bid amount: ", bidAmount);
    if (bidAmount && bidAmount > 0) {
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
    } else {
      Modal.error({
        title: "Invalid Bid",
        content: "Bid amount must be greater than 0.",
      });
    }
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
            value={bidAmountInput}
            onChange={handleBidChange}
            style={{ borderRadius: "5px", fontSize: "1.2rem" }}
            required
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
