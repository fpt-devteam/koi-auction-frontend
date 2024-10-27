import { Typography } from "antd";

const { Text } = Typography;

function AuctionMethod({ auctionMethod }) {
  return (
    <div>
      <Text strong style={{ fontSize: "1rem", fontWeight: "bold" }}>
        Auction Method:{" "}
      </Text>{" "}
      {/* <br /> */}
      <Text style={{ fontSize: "1rem" }}>
        {auctionMethod.auctionMethodName}
      </Text>
    </div>
  );
}

export default AuctionMethod;
