import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { message, Modal } from "antd";
import { joinAuctionLot } from "../helpers/signalRHelper";
import { placeBid } from "../helpers/signalRHelper";
import { signalRMess } from "../helpers/signalRHelper";

const useSignalRConnection = (auctionLotId, userId, setPredictEndTime, setWinner, 
                                setPriceDesc, setConnection, 
                                fetchAuctionLot, fetchBidLog, fetchSoldLot) => {  
    useEffect(() => {
        if (auctionLotId == null) return;
        
        let newConnection = null;
        const TIME_MESS = 5;
    
        const initializeConnection = async () => {
            newConnection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:3002/hub")
                .withAutomaticReconnect()
                .build();
    
            try {
                await newConnection.start();
                console.log("Connected to SignalR");
            
                newConnection.on(signalRMess.RECEIVE_START_AUCTION_LOT, () => {
                    message.success("The auction has started. Please place your bids now!", TIME_MESS);
                });
            
                newConnection.on(signalRMess.RECEIVE_SUCCESS_BID, (bidAmount) => {
                    message.success(`You have successfully placed a bid of ${bidAmount}`);
                });
            
                newConnection.on(signalRMess.RECEIVE_PREDICT_END_TIME, (predictEndTime) => {
                    console.log(`Predicted end time: ${predictEndTime}`);
                    setPredictEndTime(predictEndTime);
                });
            
                newConnection.on(signalRMess.RECEIVE_WINNER, (winner) => {
                    setWinner(winner);
                });

                newConnection.on(signalRMess.RECEIVE_PRICE_DESC, (priceDesc) => {
                    console.log(`Price has decreased to ${priceDesc}`);
                    message.success(`Price has decreased to ${priceDesc}`, TIME_MESS);
                    setPriceDesc(priceDesc);
                });

                newConnection.on(signalRMess.RECEIVE_FETCH_AUCTION_LOT, async () => {
                    console.log("RECEIVE_FETCH_AUCTION_LOT");
                    await fetchAuctionLot();
                });

                newConnection.on(signalRMess.RECEIVE_FETCH_BID_LOG, async () => {
                    await fetchBidLog();
                });

                newConnection.on(signalRMess.RECEIVE_FETCH_WINNER_PRICE, async () => {
                    await fetchSoldLot();
                });

                newConnection.on(signalRMess.RECEIVE_END_AUCTION_LOT, (winner) => {
                    message.destroy();
                    setWinner(winner);
                    const mess = winner === null ? "Auction has ended. No winner" : `Auction has ended. Winner is ${winner.bidderId} with bid ${winner.bidAmount}`;
                    message.success(mess, TIME_MESS);
                });

                newConnection.on(signalRMess.RECEIVE_EXCEPTION_MESSAGE, (exceptionMessage) => {
                    message.error(exceptionMessage);
                });

                newConnection.on(signalRMess.RECEIVE_SUCCESS_PAYMENT, (paymentDto) => {
                    //make a modal to show payment success OK button
                    //modal antd
                    const { amount } = paymentDto;
                    console.log(paymentDto)
                    Modal.success({
                        title: 'Congratulations!',
                        content: (
                            <div>
                                <p>You are the winner of the auction!</p>
                                <p>The auction item has been successfully paid for.</p>
                                <p>You have paid <strong>{amount.toLocaleString()} VND</strong> for this item.</p>
                            </div>
                        ),
                        onOk() {},
                    });
                });

                newConnection.on(signalRMess.RECEIVE_LOADING, () => {
                    message.loading("Waiting for finding winner...");
                });

                await joinAuctionLot(newConnection, userId, auctionLotId);

            } catch(err) {
                console.error("Error while starting connection:", err);
            }
            setConnection(newConnection);
        };

    initializeConnection();

    return () => {
        if (newConnection) {
          newConnection.stop().then(() => console.log("SignalR connection stopped"))
            .catch((err) => console.error("Error while stopping connection:", err));
        }
      };
    }, [auctionLotId, userId]);
  };
export default useSignalRConnection;

  