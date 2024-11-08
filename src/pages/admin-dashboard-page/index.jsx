import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import LineChartComponent from "../../components/child-line-chart-dashboard";
import PieChartComponent from "../../components/pie-chart-dashboard";
import ColumnChartComponent from "../../components/column-chart-dashboard";
import MainLineChartComponent from "../../components/main-line-chart-dashboard";
import axios from "axios";
import TableComponent from "../../components/table-dashboard";
import lotApi from "../../config/lotApi";
import TotalHistoryComponent from "../../components/total-lot";

function DashBoardPage() {
  // Pie-chart thống kê tỉ lệ auction method được breeder lựa chọn cho lot
  const [auctionMethodData, setAuctionMethodData] = useState([]);
  const fetchAuctionMetodData = async () => {
    try {
      const response = await lotApi.get(`/lots/auction-method-statistics`);
      setAuctionMethodData(response.data);
      console.log("Nhe nhang va tinh cam", auctionMethodData);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAuctionMetodData();
    console.log("Updated auctionMethodData:", auctionMethodData);
  }, []);

  // table thống kê mỗi breeder đóng góp như thế nào cho cty
  const [breederStatistics, setBreederStatistic] = useState([]);
  const fetchBreederStatistics = async () => {
    try {
      const response = await lotApi.get(`/lots/breeder-statistics`);
      setBreederStatistic(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchBreederStatistics();
  }, []);

  const [totalStatistics, setTotal] = useState([]);
  const fetchTotalStatistics = async () => {
    try {
      const response = await lotApi.get(`/lots/total-statistics`);
      const dataArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setTotal(dataArray);
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchTotalStatistics();
  }, []);

  return (
    <div style={{ padding: "2% 4% 4% 4%" }}>
      <h1>DashBoard</h1>
      {/* <Row gutter={20}>
        <Col span={6}>
          <LineChartComponent color={"lightblue"} />
        </Col>
        <Col span={6}>
          <LineChartComponent />
        </Col>
        <Col span={6}>
          <LineChartComponent />
        </Col>
        <Col span={6}>
          <LineChartComponent />
        </Col>
      </Row> */}
      {/* 
      <Row gutter={20}>
        <Col span={24}>
          <MainLineChartComponent />
        </Col>
      </Row> */}

      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={16}>
          <PieChartComponent
            data={auctionMethodData}
            additionalDataKey="count"
            dataKey="rate"
            nameKey="auctionMethodName"
            title="Auction Method Statistics"
          />
        </Col>
        <Col span={8} style={{}}>
          <TotalHistoryComponent
            data={totalStatistics}
            title="Total Lot Statistics"
          />
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={24}>
          <TableComponent data={breederStatistics} title="Breeder Statistics" />
        </Col>
      </Row>
    </div>
  );
}
export default DashBoardPage;
