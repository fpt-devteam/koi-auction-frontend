import React, { useEffect, useState } from "react";
import "./index.css";
// import styled from "styled-components";
import {
  message,
} from "antd";
import useFetchLots from "../../hooks/useFetchLots";
import AuctionForm from "../../components/auction-form";
import lotApi from "../../config/lotApi";


export default function CreateAuctionPage() {
  const { lots, refetch } = useFetchLots(2); //get lot list
  const [seed, setSeed] = useState(1);
  console.log(lots);
  const convertToTimeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = 0;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const handleCreate = async (auctionData, atoiList) => {
    try {
      const response = await lotApi.post("auctions", auctionData);
      let cnt = 0;
      let newAuctionLotList = atoiList.map(
        (item) =>
        (item = {
          auctionId: response.data.auctionId,
          auctionLotId: item.lotId,
          orderInAuction: ++cnt,
          duration: convertToTimeFormat(item.duration),
          stepPercent: item.stepPercent,
        })
      );
      const auctionLotRespone = await lotApi.post(
        "auction-lots/listAuctionLot",
        newAuctionLotList
      );
      message.success("Created successfully!");
      handleReset();
    } catch (error) {
      console.log(error);
      message.error("Failed to create auction!");
    }
  };
  const handleReset = () => {
    setSeed(Math.random());
    refetch();
  };
  return <>
    <AuctionForm key={seed} auctionLots={[]} approvedLots={lots} onSubmit={handleCreate} mode="Create" handleReset={handleReset} />
  </>
}

/*
1. call api tạo mới 1 auction vào Auction

2. call api thêm các lot trong auction vào AuctionLot
*/