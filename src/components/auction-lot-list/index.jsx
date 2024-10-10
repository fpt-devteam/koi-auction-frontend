import { Row, Col, Spin, message } from "antd";
import { useEffect, useState } from "react";
import lotApi from "../../config/lotApi";
import AuctionLotCard from "../auction-lot-card";

const AuctionLotList = ({ auctionId }) => {
  // Fetch auction lots by auctionId
  const [auctionLots, setAuctionLots] = useState([]);
  const fetchAuctionLots = async () => {
    try {
      const response = await lotApi.get(`auction-lots?AuctionId=${auctionId}`);
      const fetchedAuctionLots = response.data;
      setAuctionLots(fetchedAuctionLots);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAuctionLots();
  }, [auctionId]);

  return (
    <div
      className="auction-lot-list"
      style={{
        marginBottom: "20px",
        padding: "80px 80px",
      }}
    >
      <Row gutter={[16, 16]}>
        {auctionLots.map((auctionLot) => (
          <Col key={auctionLot.lotDto.lotId} xs={24} sm={12} md={8} lg={6}>
            <AuctionLotCard auctionLot={auctionLot} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AuctionLotList;
