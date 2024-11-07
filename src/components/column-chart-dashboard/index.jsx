import React from "react";
import { Card, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

// Dữ liệu mẫu
const data = [
  { breeder: "Breeder A", successful: 40, unsuccessful: 20 },
  { breeder: "Breeder B", successful: 60, unsuccessful: 30 },
  { breeder: "Breeder C", successful: 20, unsuccessful: 15 },
  { breeder: "Breeder D", successful: 50, unsuccessful: 25 },
  { breeder: "Breeder E", successful: 30, unsuccessful: 10 },
];

const ColumnChartComponent = () => {
  return (
    <Card
      style={{
        borderRadius: 12,
        padding: "1%",
        textAlign: "left",
        margin: "2%",
      }}
      bordered={false}
    >
      <Title level={3}>Auction Outcome Report</Title>
      <Typography.Text type="secondary">
        (Comparison to previous periods)
      </Typography.Text>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="breeder" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="successful" fill="#1a73e8" name="Successful Auctions" />
          <Bar
            dataKey="unsuccessful"
            fill="#90caf9"
            name="Unsuccessful Auctions"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ColumnChartComponent;
