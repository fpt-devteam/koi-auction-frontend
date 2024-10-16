import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AuctionLotList from "../../components/auction-lot-list";
import lotApi from "../../config/lotApi";
import { useState } from "react";
import { message } from "antd";
import BackButton from "../../components/back-button";

function AuctionDetailPage() {
  // const { search } = useLocation();
  // const query = new URLSearchParams(search);
  // auctionId = query.get("auction-id");

  // const [auction, setAuction] = useState({});

  // const fetchAuctionById = async () => {
  //   try {
  //     const response = await lotApi.get(`auctions/${auctionId}`);
  //     const fetchedAuction = response.data;
  //     setAuction(fetchedAuction);
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };

  // useState(() => {
  //   fetchAuctionById();
  // }, [auctionId]);
  const location = useLocation();
  const { auction } = location.state || {};

  console.log("auction", auction);
  const { auctionId, auctionName, startTime, endTime } = auction;

  console.log("endTime", endTime);
  const formatTime = (time) => new Date(time).toLocaleString();

  const navigate = useNavigate();
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px 80px",
        lineHeight: "2",
      }}
    >
      <h2>{auctionName}</h2>
      <p>Start time: {formatTime(startTime)}</p>
      {endTime != null && <p>End time: {formatTime(endTime)}</p>}
      <AuctionLotList auctionId={auctionId} />
      <BackButton />
    </div>
  );
}

export default AuctionDetailPage;
