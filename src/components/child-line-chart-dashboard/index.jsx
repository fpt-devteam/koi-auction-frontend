import React from "react";
import { Card, Typography, Row, Col } from "antd";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";
import { UserOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { count } from "firebase/firestore/lite";
import { formatCurrency } from "../../helpers/formatCurrency";

const { Title } = Typography;

const LineChartComponent = ({
  data,
  fetchData,
  title = "",
  icon,
  currency,
  timeLabel,
}) => {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative", // To position the label
      }}
    >
      {/* Time Label */}
      {timeLabel && (
        <Text
          type="secondary"
          style={{
            position: "absolute",
            top: "5%",
            right: "5%",
            fontSize: "12px",
            color: "#999",
            // Positioning to the right
          }}
        >
          {timeLabel}
        </Text>
      )}
      {/* Icon */}
      <div
        style={{
          fontSize: "32px",
          color: "#3366ff",
          marginBottom: "10px",
        }}
      >
        {icon || <UserOutlined />}
      </div>

      {/* Title */}
      <Text type="secondary" style={{ fontSize: "14px" }}>
        {title}
      </Text>

      {/* Formatted Count */}
      <Title level={3} style={{ margin: "5px 0", color: "#333" }}>
        {formatCurrency(data, currency)}
      </Title>
    </Card>
  );
};
LineChartComponent.propTypes = {
  data: PropTypes.number,
  fetchData: PropTypes.func,
  title: PropTypes.string,
  icon: PropTypes.node,
  currency: PropTypes.string,
};
export default LineChartComponent;
