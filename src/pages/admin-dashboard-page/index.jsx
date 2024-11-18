import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import PieChartComponent from "../../components/pie-chart-dashboard";
import MainLineChartComponent from "../../components/main-line-chart-dashboard";
import TableComponent from "../../components/table-dashboard";
import lotApi from "../../config/lotApi";
import TotalHistoryComponent from "../../components/total-lot";
import LineChartComponent from "../../components/child-line-chart-dashboard";
import userApi from "../../config/userApi";
import paymentApi from "../../config/paymentApi";
import {
  DatabaseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CarOutlined,
  InboxOutlined,
  StopOutlined,
  WarningOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import DateRangeCard from "../../components/date-card";
import dayjs from "dayjs";
import "./dashboard.css";
import soldLotApi from "../../config/soldLotApi";

function AdminDashboardPage() {
  // Thiết lập ngày mặc định (7 ngày trước và hôm nay)
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
    return dayjs(date).format("MM-DD-YYYY");
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

  //total lot
  const [totalStatistics, setTotal] = useState({
    total: 0,
    completedLots: 0,
    unsoldLots: 0,
    toShipLots: 0,
    toReceiveLots: 0,
    canceledSoldLots: 0,
    rejectedLots: 0,
  });
  const fetchTotalStatistics = async (formattedStartDate, formattedEndDate) => {
    try {
      const response = await lotApi.get(
        `/lots/total-statistics?startDateTime=${formattedStartDate}&endDateTime=${formattedEndDate}`
      );
      setTotal(response.data); // Đặt dữ liệu từ API trực tiếp
      console.log(response.data); // Log để xác nhận cấu trúc
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchTotalStatistics(dateRange.startDate, dateRange.endDate);
    }
  }, [dateRange]);

  // const WITHDRAW = 1;
  // const DEPOSIT = 3;
  const PAYOUT = 4;
  // //payment-service statistics
  // const [withdrawStatistic, setWithdrawStatistic] = useState([]);
  // const [depositStatistic, setDepositStatistic] = useState([]);
  const [payoutStatistic, setPayoutStatistic] = useState([]);
  const fetchStatisticByTransTypeId = async (dayAmount = 30, transType) => {
    try {
      const response = await paymentApi.get(
        `/admin/statistics/get-sum-of-success-trans-by-type?dayAmount=${dayAmount}&transTypeId=${transType}`
      );
      // if (transType == WITHDRAW) setWithdrawStatistic(response.data);
      // else if (transType == DEPOSIT) setDepositStatistic(response.data);
      if (transType == PAYOUT) setPayoutStatistic(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    //   fetchStatisticByTransTypeId(30, WITHDRAW);
    //   fetchStatisticByTransTypeId(30, DEPOSIT);
    fetchStatisticByTransTypeId(30, PAYOUT);
  }, []);

  // Fetch revenue statistics

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
      console.log("API params:", formattedStartDate, formattedEndDate);
      const response = await lotApi.get(
        `/lots/revenue-statistics?startDateTime=${formattedStartDate}&endDateTime=${formattedEndDate}`
      );
      const revenueData = response.data;
      console.log(revenueData);
      console.log("total", revenueData.total);
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
    } catch (error) {
      // message.error("Error fetching revenue data: " + error.message);
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

  // // table thống kê mỗi breeder đóng góp như thế nào cho cty
  const [statusStatistics, setStatusStatistic] = useState([]);
  const fetchStatusStatistics = async () => {
    try {
      const response = await soldLotApi.get(``);
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
      <h1>DashBoard</h1>
      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={6} style={{ marginBottom: "1%" }}>
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
                height: "100%",
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
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.total}
            fetchData={fetchTotalStatistics}
            title="Total Lot Statistics"
            icon={<DatabaseOutlined className="icon-blue" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.completedLots}
            fetchData={fetchTotalStatistics}
            title="Completed Lot Statistics"
            icon={<CheckCircleOutlined className="icon-green" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.unsoldLots}
            fetchData={fetchTotalStatistics}
            title="Unsold Lot Statistics"
            icon={<CloseCircleOutlined className="icon-red" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.toShipLots}
            fetchData={fetchTotalStatistics}
            title="To Ship Lots Statistics"
            icon={<CarOutlined className="icon-blue" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.toReceiveLots}
            fetchData={fetchTotalStatistics}
            title="To Receive Lots Statistics"
            icon={<InboxOutlined className="icon-orange" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.canceledSoldLots}
            fetchData={fetchTotalStatistics}
            title="Canceled Sold Lots Statistics"
            icon={<StopOutlined className="icon-red" />}
            currency=""
          />
        </Col>
        <Col span={6} style={{ marginBottom: "1%" }}>
          <LineChartComponent
            data={totalStatistics.rejectedLots}
            fetchData={fetchTotalStatistics}
            title="Rejected Lots Statistics"
            icon={<WarningOutlined className="icon-orange" />}
            currency=""
          />
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: "3%" }}>
        <Col span={18} style={{ marginBottom: "1%" }}>
          <MainLineChartComponent
            data={revenueStatistics}
            fetchData={fetchRevenueStatistics}
            title="Total Revenue"
            extra={`From ${dateRange.startDate} to ${dateRange.endDate}`}
          />
        </Col>

        <Col span={6}>
          <Row gutter={20} style={{ height: "auto" }}>
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
                title="Total Revenue Of Website"
                icon={<DollarCircleOutlined className="icon-green" />}
                currency="VND"
              />
            </Col>
            <Col span={24} style={{ marginBottom: "5%" }}>
              <LineChartComponent
                title="Total Payout Of All Breeders"
                data={payoutStatistic.totalAmount}
                icon={<DollarCircleOutlined />} // Custom icon for "Deposit"
                currency="VND"
                timeLabel="1 Month"
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

      {/* <Row gutter={20} style={{ marginTop: "3%", marginBottom: "3%" }}>
        <Col span={8}>
          <LineChartComponent
            title="Total Payout of all breeders"
            data={payoutStatistic.totalAmount}
            icon={<DollarCircleOutlined />} // Custom icon for "Deposit"
            currency="VND"
            timeLabel="1 Month"
          />
        </Col>
        <Col span={8}>
          <LineChartComponent
            title="Total Deposit"
            data={depositStatistic.totalAmount}
            icon={<DollarCircleOutlined />} // Custom icon for "Deposit"
            currency="VND"
            timeLabel="1 Month"
          />
        </Col>
        <Col span={8}>
          <LineChartComponent
            title="Total Withdraw"
            data={withdrawStatistic.totalAmount}
            icon={<MinusCircleOutlined />}
            currency="VND"
            timeLabel="1 Month"
          />
        </Col>
      </Row> */}

      {/* <Row gutter={20} style={{ marginTop: "3%" }}>
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
      </Row> */}
    </div>
  );
}
export default AdminDashboardPage;
