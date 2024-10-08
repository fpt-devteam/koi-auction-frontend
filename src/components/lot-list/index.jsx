/* eslint-disable no-unused-vars */
// src/components LotList.js
// @ts-ignore

import { Row, Col, Spin, message } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import LotCard from "../lot-card";
import lotApi from "../../config/lotApi";
import React from "react";
import useFetchLots from "../../hooks/useFetchLots";

const LotList = ({ lotStatusId }) => {
  // const [lots, setLots] = useState([]);
  // const [loading, setLoading] = useState(true); // Trạng thái loading

  // useEffect(() => {
  //   const fetchLots = async () => {
  //     try {
  //       const response = await lotApi.get(`lots?LotStatusId=${lotStatusId}`);
  //       const fetchedLots = response.data.$values;
  //       setLots(fetchedLots);
  //       setLoading(false);
  //     } catch (error) {
  //       message.error(error.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchLots();
  // }, [lotStatusId]); // Gọi API khi component được mount

  const { lots, loading, refetch } = useFetchLots(lotStatusId);

  return loading ? (
    <Spin />
  ) : (
    <div
      className="lot-list"
      style={{
        marginBottom: "20px",
      }}
    >
      <Row gutter={[16, 16]}>
        {lots.map((lot) => (
          <Col key={lot.lotId} xs={24} sm={24} md={24} lg={24}>
            <LotCard lot={lot} refetch={refetch} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LotList;
