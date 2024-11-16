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
import DateRangeCard from "../../components/date-card";
import dayjs from "dayjs";
import soldLotApi from "../../config/soldLotApi";
import TableComponent from "../../components/table-dashboard";

function BreederDashboardPage() {
  // //breeder revenue
  // const [revenueStatistics, setRevenueStatistics] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Revenue",
  //       data: [],
  //       borderColor: "#3a6df0",
  //       backgroundColor: "rgba(58, 109, 240, 0.2)",
  //       pointBackgroundColor: "#3a6df0",
  //       tension: 0.4,
  //       fill: true,
  //     },
  //   ],
  // });

  const { user } = useSelector((store) => store.user);
  // const fetchRevenueStatistics = async (offsetWeeks = 14) => {
  //   try {
  //     const response = await paymentApi.get(
  //       `/breeder/statistics/get-sum-of-payout?userId=${user.UserId}&dayAmount=${offsetWeeks}`
  //     );
  //     const revenueData = response.data;

  //     // Sort revenueData by date in ascending order
  //     revenueData.sort(
  //       (a, b) => new Date(a.dateFormatted) - new Date(b.dateFormatted)
  //     );

  //     console.log("revenue data", revenueData);
  //     setRevenueStatistics({
  //       labels: revenueData.map((item) => item.dateFormatted),
  //       datasets: [
  //         {
  //           label: "Revenue",
  //           data: revenueData.map((item) => item.totalAmount),
  //           borderColor: "#3a6df0",
  //           backgroundColor: "rgba(58, 109, 240, 0.2)",
  //           pointBackgroundColor: "#3a6df0",
  //           tension: 0.4,
  //           fill: true,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     message.error("Error fetching revenue data: " + error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchRevenueStatistics();
  // }, []);

  // //total lot
  // const [totalStatistics, setTotal] = useState([]);
  // const fetchTotalStatistics = async () => {
  //   try {
  //     const response = await lotApi.get(
  //       `/lots/total-statistics?BreederId=${user.UserId}`
  //     );
  //     const dataArray = Array.isArray(response.data)
  //       ? response.data
  //       : [response.data];
  //     setTotal(dataArray);
  //     console.log("huuhhuhhuhuhhu", response.data);
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   fetchTotalStatistics();
  // }, []);

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

  const today = dayjs().format("MM-DD-YYYY");
  const sevenDaysAgo = dayjs().subtract(7, "days").format("MM-DD-YYYY");

  const [dateRange, setDateRange] = useState({
    startDate: sevenDaysAgo,
    endDate: today,
  });
  console.log(`startdate: ${today}`);

  // Hàm định dạng ngày cho API
  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return dayjs(date).format("YYYY-MM-DD");
  };

  // Xử lý khi thay đổi phạm vi ngày
  const handleDateChange = (startDate, endDate) => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate });
    // Log giá trị sau khi định dạng
    console.log(`startdate2: ${formattedStartDate}`);
    fetchRevenueStatistics(formattedStartDate, formattedEndDate);
  };

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

  const fetchRevenueStatistics = async (
    formattedStartDate,
    formattedEndDate
  ) => {
    try {
      console.log(`startdategsfgsfg`);
      console.log(`startdate3: ${formattedStartDate}`);
      // var tmp = formattedStartDate.format("MM-DD-YYYY");
      // console.log(`startdate22: ${tmp}`);
      console.log("API params: hehee", formattedStartDate, formattedEndDate);
      const response = await paymentApi.get(
        `/breeder/statistics/get-sum-of-payout/${user.UserId}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      const revenueData = response.data;
      console.log("a nuon", revenueData);
      setRevenueStatistics({
        labels: revenueData.map((item) => item.date),
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
      console.log("a nuon 2", revenueStatistics);
    } catch (error) {
      message.error("Error fetching revenue data: " + error.message);
    }
  };

  // Gọi dữ liệu mặc định (7 ngày trước đến hôm nay) khi load trang
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchRevenueStatistics(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange]);

  const calculateTotalRevenue = (statistics) => {
    if (
      !statistics ||
      !statistics.datasets ||
      !statistics.datasets[0].data ||
      !Array.isArray(statistics.datasets[0].data)
    ) {
      return 0;
    }
    return statistics.datasets[0].data.reduce(
      (total, revenue) => total + revenue,
      0
    );
  };

  // status
  const [statusStatistics, setStatusStatistic] = useState([]);
  const fetchStatusStatistics = async () => {
    try {
      const response = await soldLotApi.get(`?BreederID=${user.UserId}`);
      setStatusStatistic(response.data);
      console.log(`ahihi cuoi cung thi ... ${response.data}`);
      // Log chi tiết
      console.log("Chi tiết response.data:", response.data);
      response.data.forEach((item, index) => {
        console.log(`Phần tử ${index + 1}:`, item);
      });
      console.log(`Dữ liệu đầy đủ: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchStatusStatistics();
  }, []);
  return (
    <div style={{ padding: "2% 4% 4% 4%" }}>
      <h1>Dashboard</h1>
      {/* First Row: Deposit and Withdraw */}
      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={18}>
          <MainLineChartComponent
            data={revenueStatistics}
            fetchData={fetchRevenueStatistics}
            title="Total Revenue"
            extra={`From ${dateRange.startDate} to ${dateRange.endDate}`}
          />
        </Col>

        <Col span={6}>
          <Row gutter={20} style={{ marginTop: "8%" }}>
            <Col span={24} style={{ marginBottom: "3%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%", // Chiều cao toàn màn hình
                }}
              >
                <div
                  style={{
                    width: "100%", // Chiều rộng box
                    height: "auto",
                    padding: "5%",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Đổ bóng
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ marginBottom: "10%" }}></h3>
                  <DateRangeCard onDateChange={handleDateChange} />
                </div>
              </div>
            </Col>
            <Col
              span={24}
              className="custom-card"
              style={{ marginBottom: "1%" }}
            >
              {console.log(
                `total doanh thu: ${calculateTotalRevenue(revenueStatistics)}`
              )}
              <LineChartComponent
                data={calculateTotalRevenue(revenueStatistics)}
                fetchData={fetchRevenueStatistics}
                title="Total Revenue"
                icon={<DollarCircleOutlined className="icon-green" />}
                currency="VND"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={24} style={{ marginBottom: "1%" }}>
          <TableComponent data={statusStatistics} title="Status Statistics" />
        </Col>
      </Row>
    </div>
  );
}
export default BreederDashboardPage;
