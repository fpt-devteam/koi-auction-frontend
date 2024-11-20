
export const joinAuctionLot = async (connection, userId, auctionLotId) => {
  const userConnectionDto = {
    UserId: userId,
    AuctionLotId: parseInt(auctionLotId),
  };
  try {
    await connection.invoke(signalRMess.JOIN_AUCTION_LOT, userConnectionDto);
    // //console.log(`sinalR Joined auction lot ${auctionLotId}`);
  } catch (error) {
    // //console.error(`Error invoking JoinAuctionLot: ${error}`);
  }
};

export const placeBid = async (connection, userId, auctionLotId, bidAmount) => {
  const createBidLogDto = {
    BidderId: parseInt(userId),
    AuctionLotId: parseInt(auctionLotId),
    BidAmount: parseFloat(parseFloat(bidAmount).toFixed(2)),
  };
  try {
    await connection.invoke(signalRMess.PLACE_BID, createBidLogDto);
    // //console.log(`Placed bid: ${bidAmount}`);
  } catch (error) {
    // //console.error(`Error invoking PlaceBid: ${error}`);
  }
};

export const signalRMess = Object.freeze({
  RECEIVE_WINNER: "ReceiveWinner",
  RECEIVE_SUCCESS_BID: "ReceiveSuccessBid",
  RECEIVE_PREDICT_END_TIME: "ReceivePredictEndTime",
  RECEIVE_FETCH_BID_LOG: "ReceiveFetchBidLog",
  RECEIVE_FETCH_AUCTION_LOT: "ReceiveFetchAuctionLot",
  RECEIVE_FETCH_WINNER_PRICE: "ReceiveFetchWinnerPrice",
  RECEIVE_EXCEPTION_MESSAGE: "ReceiveExceptionMessage",
  RECEIVE_START_AUCTION_LOT: "ReceiveStartAuctionLot",
  RECEIVE_END_AUCTION_LOT: "ReceiveEndAuctionLot",
  RECEIVE_PRICE_DESC: "ReceivePriceDesc",
  RECEIVE_PENDING_PAYMENT: "ReceivePendingPayment",
  RECEIVE_LOADING: "ReceiveLoading",

  JOIN_AUCTION_LOT: "JoinAuctionLot",
  PLACE_BID: "PlaceBid",
});