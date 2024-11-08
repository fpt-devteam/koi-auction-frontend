import React from "react";
import { Card, Typography, Row, Col } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;

const monthlyNewUsers = [
  { month: "January", newUser: 100 },
  { month: "February", newUser: 200 },
  { month: "March", newUser: 250 },
  { month: "April", newUser: 300 },
  { month: "May", newUser: 400 },
  { month: "June", newUser: 350 },
  { month: "July", newUser: 450 },
  { month: "August", newUser: 500 },
  { month: "September", newUser: 600 },
  { month: "October", newUser: 650 },
  { month: "November", newUser: 700 },
  { month: "December", newUser: 800 },
];

const LineChartComponent = ({ color = "#f3e7fc" }) => {
  return (
    <Card
      style={{
        borderRadius: 12,
        // backgroundColor: "#f3e7fc",
        backgroundColor: color,
        padding: "20px",
        textAlign: "left",
        // margin: "2%",
        height: "100%",
      }}
      bordered={false}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <UserOutlined style={{ fontSize: "24px", color: "#8884d8" }} />
            <Title level={4} style={{ marginLeft: 10, marginBottom: 0 }}>
              New Users
            </Title>
          </div>
          <Title level={2} style={{ margin: 0 }}>
            1.35m
          </Title>
          <div style={{ display: "flex", alignItems: "center", color: "red" }}>
            <ArrowDownOutlined style={{ marginRight: 5 }} />
            <span>-0.1%</span>
          </div>
        </Col>
        <Col span={12}>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={monthlyNewUsers}>
              <Line
                type="monotone"
                dataKey="newUser"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  );
};

export default LineChartComponent;
