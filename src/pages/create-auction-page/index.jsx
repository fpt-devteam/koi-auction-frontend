import React, { useState } from "react";
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
  const handleCreate = async (auctionData, atoiList, itoaList) => {
    try {
      console.log(auctionData);
      const response = await lotApi.post("auctions", auctionData);
      let cnt = 0;
      let newAuctionLotList = atoiList.map(
        (item) =>
        (item = {
          auctionId: response.data.auctionId,
          auctionLotId: item.lotId,
          orderInAuction: ++cnt,
          duration: "00:30:00",
          stepPercent: 5,
        })
      );
      console.log(newAuctionLotList);
      const auctionLotRespone = await lotApi.post(
        "auction-lots/listAuctionLot",
        newAuctionLotList
      );
      console.log(auctionLotRespone.data);
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