import { Col, message, Row } from "antd";
import MainLineChartComponent from "../../components/main-line-chart-dashboard";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TotalHistoryComponent from "../../components/total-lot";
import paymentApi from "../../config/paymentApi";
import lotApi from "../../config/lotApi";
import LineChartComponent from "../../components/child-line-chart-dashboard";
import { DollarCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

function BreederDashboardPage() {
  //breeder revenue
  const [revenueStatistics, setRevenueStatistics] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenue",
        data: [],
        borderColor: "#3a6df0",
        backgroundColor: "rgba(58, 109, 240, 0.2)",
        pointBackgroundColor: "#3a6df0",
        tension: 0.4,
        fill: true,
      },
    ],
  });

  const { user } = useSelector((store) => store.user);
  const fetchRevenueStatistics = async (offsetWeeks = 14) => {
    try {
      const response = await paymentApi.get(
        `/breeder/statistics/get-sum-of-payout?userId=${user.UserId}&dayAmount=${offsetWeeks}`
      );
      const revenueData = response.data;

      // Sort revenueData by date in ascending order
      revenueData.sort((a, b) => new Date(a.dateFormatted) - new Date(b.dateFormatted));

      console.log("revenue data", revenueData);
      setRevenueStatistics({
        labels: revenueData.map((item) => item.dateFormatted),
        datasets: [
          {
            label: "Revenue",
            data: revenueData.map((item) => item.totalAmount),
            borderColor: "#3a6df0",
            backgroundColor: "rgba(58, 109, 240, 0.2)",
            pointBackgroundColor: "#3a6df0",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (error) {
      message.error("Error fetching revenue data: " + error.message);
    }
  };

  useEffect(() => {
    fetchRevenueStatistics();
  }, []);

  //total lot
  const [totalStatistics, setTotal] = useState([]);
  const fetchTotalStatistics = async () => {
    try {
      const response = await lotApi.get(
        `/lots/total-statistics?BreederId=${user.UserId}`
      );
      const dataArray = Array.isArray(response.data)
        ? response.data
        : [response.data];
      setTotal(dataArray);
      console.log("huuhhuhhuhuhhu", response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchTotalStatistics();
  }, []);

  //payment-service statistics
  // const [paymentStatistic, setPaymentStatistics] = useState([]);
  // const fetchPaymentStatistic = async (dayAmount = 30, transType) => {
  //   try {
  //     const response = await paymentApi.get(
  //       `/statistics/transaction-history?userId=${user.UserId}&dayAmount=${dayAmount}&Status=Success&TransType=${transType}`
  //     );
  //     console.log(response);
  //     setPaymentStatistics(response.data);
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };
  // useEffect(() => {
  //   fetchPaymentStatistic();
  // }, []);

  return (
    <div style={{ padding: "2% 4% 4% 4%" }}>
      <h1>Dashboard</h1>

      {/* First Row: Deposit and Withdraw */}
      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={18}>
          <MainLineChartComponent
            data={revenueStatistics}
            fetchData={fetchRevenueStatistics}
            title="Total Revenue "
            extra="Last 15 days"
            numBack={7}
          />
        </Col>
        <Col span={6}>
          <TotalHistoryComponent
            data={totalStatistics}
            title="Total Lot Statistics"
          />
        </Col>
      </Row>
    </div>
  );
}
export default BreederDashboardPage;
