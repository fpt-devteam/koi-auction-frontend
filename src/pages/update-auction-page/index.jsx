import React, { useEffect, useState } from "react";
import "./index.css";
// import styled from "styled-components";
import {
  message,
  Spin,
} from "antd";
import useFetchLots from "../../hooks/useFetchLots";
import AuctionForm from "../../components/auction-form";
import lotApi from "../../config/lotApi";
import { useLocation } from "react-router-dom";


export default function UpdateAuctionPage({ auctionId }) {
  // how to get auctionId from url
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  const { lots, refetch } = useFetchLots(2); //get lot list
  const query = new URLSearchParams(search);
  auctionId = query.get("auction-id");
  const [seed, setSeed] = useState(1);
  const [auctionLots, setAuctionLots] = useState([]);
  const timeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalMinutes = (hours * 60) + minutes + (seconds / 60);
    return Math.round(totalMinutes);
  }
  const fetchAuctionLots = async (auctionId) => {
    try {
      setIsLoading(true);
      const response = await lotApi.get(`auction-lots?AuctionId=${auctionId}`);
      const auctionLotList = response.data.map((item) => ({
        ...item.lotDto,
        auctionLotId: item.auctionLotId,
        orderInAuction: item.orderInAuction,
        duration: timeToMinutes(item.duration),
        stepPercent: item.stepPercent,
      }
      ));
      // const auctionLotList = response.data;
      setAuctionLots(auctionLotList);
    } catch (error) {
      setIsError(true);
      message.error(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAuctionLots(auctionId);
  }, [auctionId]);

  const handleUpdate = async (auctionData, atoiList, itoaList) => {
    try {
      //Call API update auction
      // console.log(auctionData);
      const response = await lotApi.put(`auctions/${auctionId}`, auctionData);
      console.log(response);

      //Call API change lot status from Approved to InAuction
      const atoiRespone = await lotApi.post(
        "auction-lots/listAuctionLot",
        atoiList
      );
      console.log(atoiRespone);


      // message.success("Update successfully!");
      // refetch();
      // setSeed(Math.random());
    } catch (error) {
      console.log(error);
      message.error("Failed to update auction!");
    }
  };
  const handleReset = () => {
    setSeed(Math.random());
    refetch();
  };
  return isLoading ? (
    <Spin />
  ) : isError ? (<Spin />) : (<>
    <AuctionForm key={seed} auctionId={auctionId} auctionLots={auctionLots} approvedLots={lots} onSubmit={handleUpdate} mode="Update" handleReset={handleReset} />
  </>);
}

/*
1. call api update 1 auction (done)

2. call api đổi status từ Approved sang In Auction (done)

3. call api đổi status từ In Auction sang Approved  

4. bắt lỗi trang update auction không tồn tại
*/