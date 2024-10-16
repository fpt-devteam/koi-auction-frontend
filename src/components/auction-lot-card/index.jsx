// const AuctionLotCard = ({ auctionLot }) => {
//   const {
//     auctionId,
//     duration,
//     orderInAuction,
//     createdAt,
//     stepPercent,
//     endTime,
//     lotDto: {
//       lotId,
//       sku,
//       startingPrice,
//       createdAt: lotCreatedAt,
//       auctionMethod: { auctionMethodId, auctionMethodName, description },
//       breederId,
//       koiFishDto: { variety, sex, sizeCm, yearOfBirth, weightKg, koiMedia },
//       lotStatusDto: { lotStatusId, lotStatusName },
//       breederDetailDto: { farmName },
//     },
//   } = auctionLot;

import { Button, Card, Row, Col, Typography, Space } from "antd";
import {
  GlobalOutlined,
  ProfileOutlined,
  WomanOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { Meta } = Card;

const AuctionLotCard = ({ auctionLot }) => {
  const {
    endTime,
    lotDto: {
      startingPrice,
      koiFishDto: { variety, sex, sizeCm, yearOfBirth, koiMedia },
      breederDetailDto: { farmName },
    },
  } = auctionLot;

  console.log("lot", auctionLot);
  const navigate = useNavigate();
  const handleClick = () => {
    // navigate(`/auction-lot-detail/${auctionLot.lotDto.lotId}`, {
    //   state: { auctionLot }, // Truyền toàn bộ auctionLot qua state
    // });
    navigate("/auction-lot-detail", {
      state: { auctionLot }, // Truyền toàn bộ auctionLot qua state
    });
  };
  return (
    <Card
      hoverable
      style={{
        margin: "10px",
        minHeight: 450,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      cover={
        <img
          alt={variety}
          src={
            koiMedia[0]?.filePath ||
            "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/nature-3267971_640.jpg?alt=media&token=71ffa7d8-247e-4053-a9b4-c1f8c8ee989d"
          }
          style={{
            height: 300,
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
      }
      onClick={handleClick} // Gọi sự kiện khi click vào card
    >
      <Meta
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Title level={4} style={{ margin: 0 }}>
              {variety}
            </Title>
          </div>
        }
        description={
          <div style={{ textAlign: "left", lineHeight: "1.6" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text strong>{endTime === null ? "Upcoming" : "Ended"}</Text>
                <Text strong style={{ color: "red" }}>
                  {startingPrice.toLocaleString()} VND
                </Text>
              </div>

              <hr />

              <Row gutter={[50, 16]} style={{ marginTop: 8 }}>
                <Col span={12}>
                  <Text>
                    <GlobalOutlined style={{ marginRight: 4 }} /> Breeder:
                    <br />
                    <strong style={{ marginLeft: 22 }}>{farmName}</strong>
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>
                    <ProfileOutlined style={{ marginRight: 4 }} /> Length:{" "}
                    <br />
                    <strong style={{ marginLeft: 22 }}>{sizeCm} cm</strong>
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>
                    <WomanOutlined style={{ marginRight: 4 }} /> Sex: <br />
                    <strong style={{ marginLeft: 22 }}>
                      {sex ? "Female" : "Male"}
                    </strong>
                  </Text>
                </Col>
                <Col span={12}>
                  <Text>
                    <CalendarOutlined style={{ marginRight: 4 }} /> Year: <br />
                    <strong style={{ marginLeft: 22 }}>{yearOfBirth}</strong>
                  </Text>
                </Col>
              </Row>
            </Space>
          </div>
        }
      />
    </Card>
  );
};

export default AuctionLotCard;
