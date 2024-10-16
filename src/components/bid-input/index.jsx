import { InputNumber, Button } from "antd";
import { useState } from "react";

const BidInput = ({ currentBid, onBid }) => {
  const [bidAmount, setBidAmount] = useState(currentBid);

  return (
    <div style={{ marginTop: "40px" }}>
      <InputNumber
        min={currentBid + 1}
        value={bidAmount}
        onChange={(value) => setBidAmount(value)}
        style={{ width: "70%", marginRight: 16 }}
      />
      <Button type="primary" onClick={() => onBid(bidAmount)}>
        Place Bid
      </Button>
    </div>
  );
};

export default BidInput;
