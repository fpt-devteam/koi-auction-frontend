import AuctionLotList from "../../components/auction-lot-list";

function AuctionDetailPage({ auctionId = 23 }) {
  return (
    <div>
      <AuctionLotList auctionId={auctionId} />
    </div>
  );
}

export default AuctionDetailPage;
