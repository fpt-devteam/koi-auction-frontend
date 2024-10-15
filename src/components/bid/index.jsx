import { InputNumber, Button } from "antd";
import { useState } from "react";

const Bid = ({ currentBid, onBid }) => {
  const [bidAmount, setBidAmount] = useState(currentBid);

  return (
    <div>
      <h3>Current Bid: ${currentBid}</h3>
      <InputNumber
        min={currentBid + 1}
        value={bidAmount}
        onChange={(value) => setBidAmount(value)}
        style={{ width: 200, marginRight: 16 }}
      />
      <Button type="primary" onClick={() => onBid(bidAmount)}>
        Place Bid
      </Button>
    </div>
  );
};

export default Bid;
