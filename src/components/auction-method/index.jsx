import { Typography } from "antd";
import BidMethodInfoButton from "../bid-method-info-button";

const { Text } = Typography;

function AuctionMethod({ auctionMethod }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
      }}
    >
      <Text strong style={{ fontSize: "1rem", fontWeight: "bold" }}>
        Auction Method {auctionMethod.auctionMethodId}:{" "}
      </Text>
      {/* <br /> */}
      <Text style={{ fontSize: "1rem" }}>
        {auctionMethod.auctionMethodName}
      </Text>
      <BidMethodInfoButton bidMethodInfo={auctionMethod.auctionMethodId} />
    </div>
  );
}

export default AuctionMethod;
