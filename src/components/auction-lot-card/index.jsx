// // src/AuctionCard.jsx
// import { Button, Card, Tooltip } from "antd";
// import { HeartOutlined } from "@ant-design/icons";
// import { Space, Typography } from "antd";
// const { Text, Link } = Typography;

// const { Meta } = Card;

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
//   return (
//     // <Card
//     //   cover={
//     //     <img
//     //       alt={variety}
//     //       src={koiMedia[0]?.filePath || "https://via.placeholder.com/240"}
//     //       style={{ height: 160, objectFit: "cover" }}
//     //     />
//     //   }
//     //   actions={[
//     //     <Tooltip title="Add to Favorites">
//     //       <HeartOutlined key="favorite" />
//     //     </Tooltip>,
//     //   ]}
//     // >
//     //   <Meta title={variety} description={`$${startingPrice} - $5000 USD`} />
//     //   <div>100 Smart Street, LA, USA</div>
//     // </Card>

//     <Card
//       hoverable
//       style={{
//         margin: "10px",
//         minHeight: 400,
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//       }}
//       cover={
//         <img
//           alt={variety}
//           src={
//             auctionLot.koiFishDto?.koiMedia[0]?.filePath ||
//             "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/nature-3267971_640.jpg?alt=media&token=71ffa7d8-247e-4053-a9b4-c1f8c8ee989d"
//           }
//           style={{ height: 300, objectFit: "cover" }}
//         />
//       }
//       //   actions={[
//       //     <Button
//       //       //   key={`add-${id}`}
//       //       type="primary"
//       //       block
//       //       style={{ backgroundColor: "#f0f0f0", color: "#555", width: "70%" }}
//       //     >
//       //       Add
//       //     </Button>,
//       //   ]}
//     >
//       <Meta
//         title={`Variety: ${auctionLot.lotDto.koiFishDto.variety}`}
//         description={
//           <div style={{ textAlign: "left", lineHeight: "1.5" }}>
//             <Text strong style={{ display: "block", marginBottom: "8px" }}>
//               Starting price: {auctionLot.lotDto.startingPrice.toLocaleString()}{" "}
//               VND
//             </Text>
//             <Text strong style={{ display: "block", marginBottom: "4px" }}>
//               By: {auctionLot.lotDto.breederDetailDto.farmName}
//             </Text>
//           </div>
//         }
//         style={{ textAlign: "left" }}
//       />
//     </Card>
//   );
// };

// export default AuctionLotCard;

import { Button, Card, Tooltip, Row, Col, Typography, Space } from "antd";
import {
  HeartOutlined,
  GlobalOutlined,
  ProfileOutlined,
  WomanOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;
const { Meta } = Card;

const AuctionLotCard = ({ auctionLot }) => {
  const {
    lotDto: {
      startingPrice,
      koiFishDto: { variety, sex, sizeCm, yearOfBirth, koiMedia },
      breederDetailDto: { farmName },
    },
  } = auctionLot;

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
      //   actions={[
      //     <Tooltip title="Add to Favorites" key="favorite">
      //       <HeartOutlined />
      //     </Tooltip>,
      //   ]}
    >
      <Meta
        title={
          <Title level={4} style={{ margin: 0 }}>
            {variety}
          </Title>
        }
        description={
          <div style={{ textAlign: "left", lineHeight: "1.6" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              {/* <Text strong style={{ fontSize: "16px" }}>
                {`Starting price: ${startingPrice.toLocaleString()} VND`}
              </Text> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text strong>Starting price:</Text>
                <Text strong>{startingPrice.toLocaleString()} VND</Text>
              </div>

              <Text type="secondary" style={{ fontSize: "14px" }}>
                By: {farmName}
              </Text>

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
