import { Row, Col, Typography } from "antd";

import { useSelector } from "react-redux";
import KoiMedia from "../../components/koi-media";
import KoiInfo from "../../components/koi-info";
import TimeLeft from "../../components/time-left";
import Bid from "../../components/bid";
import SuggestLogin from "../../components/suggest-login";
import BidHistory from "../../components/bid-history";
import { useLocation } from "react-router-dom";
const { Text } = Typography;

//component for description of aution method
const AuctionMethod = ({ auctionMethod }) => {
  return (
    <div style={{ marginTop: "50px" }}>
      <Text strong style={{ fontSize: "1.2rem" }}>
        Auction Method:{" "}
      </Text>{" "}
      <br />
      <Text>{auctionMethod.auctionMethodName}</Text>
    </div>
  );
};

const AuctionLotDetailPage = () => {
  const location = useLocation();
  const { auctionLot } = location.state || {}; // Lấy dữ liệu từ state

  //get user from redux
  const user = useSelector((state) => state.user);

  if (!auctionLot) {
    return <div>No auction lot data found</div>; // Xử lý nếu không có dữ liệu
  }

  const {
    duration,
    endTime,
    lotDto: {
      sku,
      startingPrice,
      auctionMethod: { auctionMethodId, auctionMethodName, description },
      koiFishDto: { variety, sex, sizeCm, yearOfBirth, koiMedia },
      breederDetailDto: { farmName },
    },
  } = auctionLot;
  //   console.log("auctionLot", auctionLot);
  //   console.log("koiFishDto", auctionLot.lotDto.koiFishDto);
  //   const currentBid = bids.length ? bids[bids.length - 1].bid : 0;
  const currentBid = 0;

  const handleBid = (bidAmount) => {
    console.log("Bid placed:", bidAmount);
    // Thực hiện logic đặt giá thầu
  };

  //wait for get user from redux
  return user === null ? null : (
    <div style={{ padding: "20px 120px" }}>
      <h2>{sku}</h2> <br />
      <Row gutter={(0, 20)}>
        <Col span={8}>
          <KoiMedia media={auctionLot.lotDto.koiFishDto.koiMedia} />
        </Col>
        <Col span={12}>
          <div
            style={{
              //   display: "flex",
              //   justifyContent: "space-between",
              //   alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Text strong style={{ fontSize: "1.2rem" }}>
              Starting price:{" "}
            </Text>
            <Text strong style={{ fontSize: "1.2rem", color: "red" }}>
              {startingPrice.toLocaleString()} VND
            </Text>
          </div>
          {user.isAuthenticated ? (
            <Bid currentBid={currentBid} onBid={handleBid} />
          ) : (
            <SuggestLogin />
          )}{" "}
        </Col>
        <Col span={4}>
          <TimeLeft duration={duration} />
          <AuctionMethod auctionMethod={auctionLot.lotDto.auctionMethod} />
        </Col>
      </Row>
      <Row gutter={(0, 20)}>
        <Col span={8} style={{ marginTop: "10px" }}>
          <KoiInfo koi={auctionLot.lotDto.koiFishDto} />
        </Col>
        <Col span={12}>{/* <BidHistory bids={bids} /> */}</Col>
      </Row>
    </div>
  );
};

export default AuctionLotDetailPage;
