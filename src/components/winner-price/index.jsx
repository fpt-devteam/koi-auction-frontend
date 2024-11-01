import React, { useEffect, useState } from "react";
import { Input, Button, Row, Col, Card, Modal, message } from "antd";
import lotApi from "../../config/lotApi";
import { Typography } from "antd";
import { ref } from "firebase/storage";

const { Text } = Typography;
const WinnerPrice = ({ auctionLotId, refetch }) => {
  //fetch sold lot of auction lot id
  const [price, setPrice] = useState(0);
  const [winner, setWinner] = useState(null);
  const fetchSoldLot = async () => {
    try {
      console.warn(`auctionLotId: ${auctionLotId}`);
      const response = await lotApi.get(`/sold-lots/${auctionLotId}`);
      const fetchedSoldLot = response.data;
      console.warn(`fetchedSoldLot: ${JSON.stringify(fetchedSoldLot)}`);
      if (fetchedSoldLot) {
        console.warn(`fetchedSoldLot.finalPrice: ${fetchedSoldLot.FinalPrice}`);
        setPrice(fetchedSoldLot.finalPrice);
        setWinner(fetchedSoldLot.winnerId);
      }
    } catch (error) {
      // message.error(error.message);
      // return;
    }
  };

  useEffect(() => {
    fetchSoldLot();
  }, [auctionLotId, refetch]);

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
          {price ? `${price.toLocaleString()} VND` : "No Bids Yet"}
        </Text>
      </div>
    </Card>
  );
};

export default WinnerPrice;
