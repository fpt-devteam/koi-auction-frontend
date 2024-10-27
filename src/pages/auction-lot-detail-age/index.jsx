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
import StatusTag from "../../components/status-tag";
import AuctionMethod from "../../components/auction-method";
const { Text } = Typography;
import * as signalR from "@microsoft/signalr";
import PriceDisplayComponent from "../../components/price-display";
import BidForm from "../../components/bid-form";
import CurrentBid from "../../components/current-bid";

const AuctionLotDetailPage = () => {
  const { auctionLotId } = useParams();
  const [auctionLot, setAuctionLot] = useState();
  const [connection, setConnection] = useState(null);

  const fetchAuctionLotById = async () => {
    try {
      const response = await lotApi.get(`auction-lots/${auctionLotId}`);
      const fetchedAuctionLot = response.data;
      setAuctionLot(fetchedAuctionLot);
    } catch (error) {
      message.error(error.message);
    }
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
          .invoke("JoinAuctionLot", {
            UserId: userId ?? parseInt(userId),
            AuctionLotId: parseInt(auctionLotId),
          }) // Đảm bảo đúng tên hàm và tham số
          .then(() => console.log("CLG: Joined auction lot" + auctionLotId))
          .catch((err) => console.error("Error invoking JoinAuctionLot:", err));

        newConnection.on("ReceiveStartAuctionLot", function (startAuctionLot) {
          fetchAuctionLotById();
          console.log("Receive startAuctionLot", startAuctionLot);
          message.open("Auction Session has started", 5);
        });

        newConnection.on("ReceiveEndAuctionLot", function () {
          fetchAuctionLotById();
          console.log("Receive endAuctionLot");
          message.loading("Auction Session has ended", 5);
        });

        newConnection.on(
          "ReceiveJoinAuctionLotErrorMessage",
          function (errorMessage) {
            console.log("Receive joinAuctionLotErrorMessage", errorMessage);
          }
        );
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

  const currentBid = 100000;
  const handleBid = (bidAmount) => {
    console.log("Bid placed:", bidAmount);
    // Thực hiện logic đặt giá thầu
  };

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
          {/* <StatusTag statusName={auctionLotStatusName} /> */}
          <div style={{ marginBottom: "10px" }}>
            <Text strong style={{ fontSize: "2rem" }}>
              {variety + " #" + sku}
            </Text>
          </div>
          <Row gutter={(0, 20)}>
            <Col span={8}>
              {/* Koi Info */}
              <KoiInfo koi={auctionLot.lotDto.koiFishDto} />
            </Col>
            <Col span={16}>
              {/* Starting price*/}
              <PriceDisplayComponent
                text="Starting price"
                value={startingPrice}
                size="small"
              />
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
            <Col span={24}>
              <CurrentBid currentBid={currentBid} />
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
          {userId && auctionLotStatusName == "Ongoing" && (
            <BidForm currentBid={currentBid} onBidSubmit={handleBid} />
          )}

          {/* Suggest Login */}
          {!userId && <SuggestLogin />}
        </Col>
      </Row>

      <Row gutter={(0, 20)}>
        <Col span={24}>
          <BidHistoryTable />
          <BackButton />
        </Col>
      </Row>
    </div>
  );
};

export default AuctionLotDetailPage;
