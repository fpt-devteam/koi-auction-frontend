import { useLocation } from "react-router-dom";
import AuctionLotList from "../../components/auction-lot-list";

function AuctionDetailPage({ auctionId = 23 }) {
  //url: auction-detail?auction-id=23
  // how to get auctionId from url
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  auctionId = query.get("auction-id");
  console.log(auctionId);

  return (
    <div>
      <AuctionLotList auctionId={auctionId} />
    </div>
  );
}

export default AuctionDetailPage;
