import React, { useEffect, useState } from "react";
import { Input, Button, Row, Col, Card, Modal, message } from "antd";
import lotApi from "../../config/lotApi";
import { Typography } from "antd";
import { ref } from "firebase/storage";

const { Text } = Typography;
const WinnerPrice = ({ winnerPrice }) => {
  console.log("price", winnerPrice);
  return (
    <Card
      style={{
        textAlign: "left",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "5px", // Giảm kích thước padding
        borderRadius: "8px", // Bo góc mềm mại
        marginTop: "auto",
        minHeight: "100px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text strong style={{ fontSize: "1.5rem" }}>
          Sold Price:{" "}
        </Text>
        <Text strong style={{ fontSize: "1.5rem", color: "red" }}>
          {winnerPrice ? `${winnerPrice.toLocaleString()} VND` : "No Bids Yet"}
        </Text>
      </div>
    </Card>
  );
};

export default WinnerPrice;
