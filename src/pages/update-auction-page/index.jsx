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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { search } = useLocation();
  const { lots, refetch } = useFetchLots(2); //get lot list

  // get auctionId from url
  const query = new URLSearchParams(search);
  auctionId = query.get("auction-id");
  const [seed, setSeed] = useState(1);
  const [auctionLots, setAuctionLots] = useState([]);

  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const totalMinutes = (hours * 60) + minutes + (seconds / 60);
    return Math.round(totalMinutes);
  }
  const convertToTimeFormat = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const seconds = 0;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const fetchAuctionLots = async (auctionId) => {
    try {
      setIsLoading(true);
      const response = await lotApi.get(`auction-lots?AuctionId=${auctionId}`);
      const auctionLotList = response.data.map((item) => ({
        ...item.lotDto,
        auctionLotId: item.auctionLotId,
        orderInAuction: item.orderInAuction,
        duration: convertTimeToMinutes(item.duration),
        stepPercent: item.stepPercent,
      }
      ));
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
  }, [auctionId, seed]);

  const handleUpdate = async (auctionData, atoiList, itoaList, updateList) => {
    try {
      await Promise.all([
        updateAuction(auctionData),
        changeLotStatusToInAuction(auctionId, atoiList),
        changeLotStatusToApproved(itoaList),
        updateAuctionLots(auctionId, updateList)
      ]);
      message.success("Update successfully!");
      refetch();
      setSeed(Math.random());
    } catch (error) {
      console.error(error);
      message.error("Failed to update auction!");
    }
  };
  const updateAuction = async (auctionData) => {
    try {
      const response = await lotApi.put(`auctions/${auctionId}`, auctionData);
      console.log(response);
    } catch (error) {
      throw new Error("Failed to update auction.");
    }
  };
  const changeLotStatusToInAuction = async (auctionId, atoiList) => {
    let cnt = 0;
    let newAuctionLotList = atoiList.map(
      (item) =>
      (item = {
        auctionId: auctionId,
        auctionLotId: item.lotId,
        orderInAuction: ++cnt,
        duration: convertToTimeFormat(item.duration),
        stepPercent: item.stepPercent,
      })
    );
    try {
      if (newAuctionLotList.length != 0) {
        const auctionLotResponse = await lotApi.post("auction-lots/listAuctionLot", newAuctionLotList);
        console.log(auctionLotResponse.data);
      }
    }
    catch (error) {
      throw new Error("Failed to update auction lot status.");
    }

  };
  const changeLotStatusToApproved = async (itoaList) => {
    const itoaIDList = itoaList.map(e => e.lotId);
    try {
      const itoaResponse = await lotApi.delete("auction-lots/listAuctionLot", {
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(itoaIDList)
      });
      console.log(itoaResponse);
    } catch (error) {
      throw new Error("Failed to change lot status.");
    }
  };
  const updateAuctionLots = async (auctionId, updateList) => {
    const updateAuctionLotList = updateList.map(e => ({
      lotId: e.lotId,
      duration: convertToTimeFormat(e.duration),
      orderInAuction: e.orderInAuction,
      stepPercent: e.stepPercent,
      auctionId: auctionId,
      auctionLotStatusId: 1
    }));
    console.log(updateAuctionLotList)
    try {
      await Promise.all(
        updateAuctionLotList.map(async (lot) => {
          const updateResponse = await lotApi.put(`auction-lots/${lot.lotId}`, lot);
          console.log(updateResponse);
        })
      );
    } catch (error) {
      throw new Error("Failed to update auction lots.");
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