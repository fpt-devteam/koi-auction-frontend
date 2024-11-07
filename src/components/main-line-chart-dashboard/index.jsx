import React, { useState } from "react";
import { Card, Button, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

// Dữ liệu giả định về doanh thu và số tiền user nạp vào theo thời gian
const dataByDay = [
  { name: "Mon", revenue: 1000, userDeposit: 500, websiteIncome: 1500 },
  { name: "Tue", revenue: 1500, userDeposit: 700, websiteIncome: 2200 },
  { name: "Wed", revenue: 1300, userDeposit: 600, websiteIncome: 1900 },
  { name: "Thu", revenue: 1700, userDeposit: 800, websiteIncome: 2500 },
  { name: "Fri", revenue: 1800, userDeposit: 900, websiteIncome: 2700 },
  { name: "Sat", revenue: 2000, userDeposit: 1100, websiteIncome: 3100 },
  { name: "Sun", revenue: 2200, userDeposit: 1000, websiteIncome: 3200 },
];

const dataByWeek = [
  { name: "Week 1", revenue: 8000, userDeposit: 4000, websiteIncome: 12000 },
  { name: "Week 2", revenue: 9000, userDeposit: 4500, websiteIncome: 13500 },
  { name: "Week 3", revenue: 9500, userDeposit: 4700, websiteIncome: 14200 },
  { name: "Week 4", revenue: 10000, userDeposit: 5000, websiteIncome: 15000 },
];

const dataByMonth = [
  { name: "Jan", revenue: 35000, userDeposit: 17000, websiteIncome: 52000 },
  { name: "Feb", revenue: 30000, userDeposit: 15000, websiteIncome: 45000 },
  { name: "Mar", revenue: 40000, userDeposit: 20000, websiteIncome: 60000 },
  { name: "Apr", revenue: 45000, userDeposit: 22000, websiteIncome: 67000 },
  { name: "May", revenue: 47000, userDeposit: 23000, websiteIncome: 70000 },
  // Thêm dữ liệu cho các tháng khác nếu cần
];

const MainLineChartComponent = () => {
  const [data, setData] = useState(dataByMonth); // Mặc định hiển thị theo tháng

  return (
    <Card
      title={
        <Title level={4}>Tổng lượng tiền, số tiền nạp vào và doanh thu</Title>
      }
      extra={
        <div>
          <Button
            onClick={() => setData(dataByMonth)}
            style={{ marginRight: 10 }}
          >
            Month
          </Button>
          <Button
            onClick={() => setData(dataByWeek)}
            style={{ marginRight: 10 }}
          >
            Week
          </Button>
          <Button onClick={() => setData(dataByDay)}>Day</Button>
        </div>
      }
      style={{ borderRadius: 12 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
            fillOpacity={0.3}
            fill="#8884d8"
            name="Doanh thu"
          />
          <Line
            type="monotone"
            dataKey="userDeposit"
            stroke="#82ca9d"
            strokeWidth={2}
            fillOpacity={0.3}
            fill="#82ca9d"
            name="User nạp tiền"
          />
          <Line
            type="monotone"
            dataKey="websiteIncome"
            stroke="#ffc658"
            strokeWidth={2}
            fillOpacity={0.3}
            fill="#ffc658"
            name="Doanh thu website"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MainLineChartComponent;
