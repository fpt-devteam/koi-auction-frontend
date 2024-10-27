import React from "react";
import { Typography, Card } from "antd";

const { Text } = Typography;

const CurrentBid = ({ currentBid }) => {
  return (
    <Card
      style={{
        textAlign: "left",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "5px", // Giảm kích thước padding
        borderRadius: "8px", // Bo góc mềm mại
        marginTop: "auto",
      }}
    >
      <Text strong style={{ fontSize: "1.5rem" }}>
        Current Bid:
      </Text>
      <Text strong style={{ fontSize: "1.5rem", color: "red" }}>
        {currentBid ? `  ${currentBid.toLocaleString()} VND` : "No Bids Yet"}
      </Text>
    </Card>
  );
};

export default CurrentBid;
