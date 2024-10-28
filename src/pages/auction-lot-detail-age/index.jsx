import { Row, Col, Typography, message } from "antd";
import { useSelector } from "react-redux";
import KoiMedia from "../../components/koi-media";
import KoiInfo from "../../components/koi-info";
import Countdown from "../../components/countdown";
import SuggestLogin from "../../components/suggest-login";
import { useParams } from "react-router-dom";
import BidHistoryTable from "../../components/bid-history-table";
import BackButton from "../../components/back-button";
import { useEffect, useState } from "react";
import lotApi from "../../config/lotApi";
import biddingApi from "../../config/biddingApi";
import StatusTag from "../../components/status-tag";
import AuctionMethod from "../../components/auction-method";
const { Text } = Typography;
import * as signalR from "@microsoft/signalr";
import PriceDisplayComponent from "../../components/price-display";
import BidForm from "../../components/bid-form";
import CurrentBid from "../../components/current-bid";
import PriceBuy from "../../components/price-buy";

const AuctionLotDetailPage = () => {
  const { auctionLotId } = useParams();
  const [auctionLot, setAuctionLot] = useState();
  const [connection, setConnection] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);

  const JOIN_AUCTION_LOT = "JoinAuctionLot";
  const RECEIVE_START_AUCTION_LOT = "ReceiveStartAuctionLot";
  const RECEIVE_END_AUCTION_LOT = "ReceiveEndAuctionLot";
  const RECEIVE_EXCEPTION_MESSAGE = "ReceiveExceptionMessage";
  const RECEIVE_CURRENT_BID = "ReceiveCurrentBid";

  const fetchAuctionLotById = async () => {
    try {
      const response = await lotApi.get(`auction-lots/${auctionLotId}`);
      const fetchedAuctionLot = response.data;
      setAuctionLot(fetchedAuctionLot);
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchBigLog = async () => {
    try {
      const response = await biddingApi.get("bid-log");
      const fetchedBidLogs = response.data;
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleBid = (bidAmount) => {
    const createBidLogDto = {
      BidderId: parseInt(userId),
      AuctionLotId: parseInt(auctionLotId),
      BidAmount: parseFloat(parseFloat(bidAmount).toFixed(2)),
    };
    console.log("clg: createBidLogDto", createBidLogDto);
    connection.invoke("PlaceBid", createBidLogDto);
  };

  const handleBuy = (price) => {
    console.log("Buy: ", price);
  };

  const { user } = useSelector((state) => state.user);
  const userId = user?.UserId || null;

  // get auctionLot
  useEffect(() => {
    fetchAuctionLotById();
  }, [auctionLotId]); // Dependencies: auctionLotId, auctionLotStatus

  // singalR
  useEffect(() => {
    if (auctionLotId == null) return;
    // Khởi tạo kết nối SignalR
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:3003/hub") // Đảm bảo URL đúng
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR");
        // Gọi hàm JoinAuctionLot từ server bằng invoke
        newConnection
          .invoke(JOIN_AUCTION_LOT, {
            UserId: userId ?? parseInt(userId),
            AuctionLotId: parseInt(auctionLotId),
          })
          .then(() => console.log("CLG: Joined auction lot" + auctionLotId))
          .catch((err) => console.error("Error invoking JoinAuctionLot:", err));

        newConnection.on(RECEIVE_START_AUCTION_LOT, function () {
          console.log("Start auction lot");
          fetchAuctionLotById();
          // alert for start auction
          message.success("The auction lot has started!", 5);
        });

        newConnection.on(RECEIVE_END_AUCTION_LOT, function () {
          console.log("End auction lot");
          fetchAuctionLotById();
          // alert for end auction
          message.success("The auction lot has ended!", 5);
        });

        newConnection.on(RECEIVE_CURRENT_BID, function (bid) {
          console.log("Receive joinAuctionLotErrorMessage", bid);
          setCurrentBid(bid.bidAmount);
        });

        newConnection.on(
          RECEIVE_EXCEPTION_MESSAGE,
          function (exceptionMessage) {
            message.error(exceptionMessage);
          }
        );

        newConnection.on(RECEIVE_CURRENT_BID, function (currentBid) {
          if (currentBid == null) return;
          setCurrentBid(currentBid);
        });
      })
      .catch((err) => console.log("Error while starting connection: ", err));

    setConnection(newConnection);

    // Cleanup: Dừng kết nối khi component bị unmount
    return () => {
      if (newConnection) {
        newConnection
          .stop()
          .then(() => console.log("SignalR connection stopped"))
          .catch((err) =>
            console.error("Error while stopping connection: ", err)
          );
      }
    };
  }, [auctionLotId, userId]); // Dependencies: auctionLotId, userId

  // Fetch bid logs
  useEffect(() => {
    if (auctionLotId == null) return;
    fetchBigLog();
  }, [auctionLotId]); // Dependencies: auctionLotId

  if (!auctionLot) return null;
  const {
    duration,
    startTime,
    endTime,
    stepPercent,
    lotDto: {
      sku,
      startingPrice,
      auctionMethod: { auctionMethodId, auctionMethodName, description },
      koiFishDto: { variety, sex, sizeCm, yearOfBirth, koiMedia },
      breederDetailDto,
    },
    auctionLotStatusDto: { auctionLotStatusId, auctionLotStatusName },
  } = auctionLot;

  const farmName = breederDetailDto ? breederDetailDto.farmName : "Unknown";
  const stepPrice =
    stepPercent != null
      ? (parseFloat(startingPrice) * parseFloat(stepPercent)) / 100
      : stepPercent;
  return (
    <div style={{ padding: "20px 120px" }}>
      {/* Auction Lot Detail */}
      <Row gutter={(0, 20)}>
        <Col span={11}>
          {/* Koi Media */}
          <KoiMedia media={auctionLot.lotDto.koiFishDto.koiMedia} />
        </Col>

        <Col span={13}>
          {/* Auction Lot Name */}{" "}
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StatusTag statusName={auctionLotStatusName} size="large" />
            <Text strong style={{ fontSize: "2rem" }}>
              {variety + " #" + sku}
            </Text>
          </div>
          <Row gutter={(0, 20)}>
            <Col span={8}>
              {/* Koi Info */}
              <KoiInfo
                koi={auctionLot.lotDto.koiFishDto}
                breederDetailDto={breederDetailDto}
              />
            </Col>
            <Col span={16}>
              {/* Starting price*/}
              {auctionMethodId != 2 && (
                <PriceDisplayComponent
                  text="Starting price"
                  value={startingPrice}
                  size="small"
                />
              )}
              {/* Step price */}
              {auctionMethodId > 2 && (
                <PriceDisplayComponent
                  text="Step price"
                  value={stepPrice}
                  size="small"
                />
              )}
              {/* Auction Method */}
              <AuctionMethod auctionMethod={auctionLot.lotDto.auctionMethod} />
            </Col>
          </Row>
          <Row gutter={(0, 20)}>
            {/* Current Bid */}
            <Col span={24}>
              {auctionMethodId == 3 && <CurrentBid currentBid={currentBid} />}
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={(0, 20)}>
        <Col span={11}>
          {/* Time countdown */}
          <Countdown
            startTime={startTime}
            endTime={endTime}
            statusName={auctionLotStatusName}
          />
        </Col>
        <Col span={13}>
          {/* Bid Form */}
          {userId && (auctionMethodId == 3 || auctionMethodId == 2) && (
            <BidForm currentBid={currentBid} onBidSubmit={handleBid} />
          )}

          {userId && (auctionMethodId == 1 || auctionMethodId == 4) && (
            <PriceBuy price={startingPrice} onBuySubmit={handleBuy} />
          )}

          {/* Suggest Login */}
          {!userId && <SuggestLogin />}
        </Col>
      </Row>

      <Row gutter={(0, 20)}>
        <Col span={24}>
          {(auctionMethodId == 1 || auctionMethodId == 3) && (
            <BidHistoryTable />
          )}
          <BackButton />
        </Col>
      </Row>
    </div>
  );
};

export default AuctionLotDetailPage;
