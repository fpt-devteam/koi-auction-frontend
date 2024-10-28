import { useLocation, useParams } from "react-router-dom";
import AuctionLotList from "../../components/auction-lot-list";
import lotApi from "../../config/lotApi";
import { useEffect, useState } from "react";
import { message } from "antd";
import BackButton from "../../components/back-button";
import StatusTag from "../../components/status-tag";

function AuctionDetailPage() {
  const { auctionId } = useParams();
  const location = useLocation();
  const [auction, setAuction] = useState(null);

  const fetchAuctionById = async () => {
    try {
      const response = await lotApi.get(`auctions/${auctionId}`);
      const fetchedAuction = response.data;
      setAuction(fetchedAuction);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAuctionById();
  }, [auctionId]); // Dependencies: auctionId and auctionFromState

  if (!auction) {
    return null;
  }
  const {
    auctionName,
    startTime,
    endTime,
    auctionStatus: { auctionStatusName },
  } = auction;
  const formatTime = (time) => new Date(time).toLocaleString();
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px 80px",
        lineHeight: "2",
      }}
    >
      <h2>{auctionName}</h2>
      <StatusTag statusName={auctionStatusName} />
      <p>Start time: {formatTime(startTime)}</p>
      {endTime != null && <p>End time: {formatTime(endTime)}</p>}
      <AuctionLotList auctionId={auctionId} />
      <BackButton />
    </div>
  );
}

export default AuctionDetailPage;
