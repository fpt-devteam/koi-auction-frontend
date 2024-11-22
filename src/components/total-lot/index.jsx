import React, { useEffect, useState } from "react";
import { Card, List, Avatar, Typography } from "antd";
import {
  FireOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";

const { Text } = Typography;

const icons = {
  total: <FireOutlined style={{ fontSize: "20px", color: "#ffffff" }} />,
  completedLots: (
    <CheckCircleOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
  ),
  unsoldLots: (
    <CloseCircleOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
  ),
  canceledSoldLots: (
    <ExclamationCircleOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
  ),
  rejectedLots: (
    <CloseCircleOutlined style={{ fontSize: "20px", color: "#ffffff" }} />
  ),
};

const iconBackgroundColors = {
  total: "#f56a00",
  completedLots: "#52c41a",
  unsoldLots: "#ff4d4f",
  canceledSoldLots: "#faad14",
  rejectedLots: "red",
};

const labels = {
  total: "Total Lots",
  completedLots: "Completed Lots",
  unsoldLots: "Unsold Lots",
  canceledSoldLots: "Canceled Sold Lots",
  rejectedLots: "Rejected Lots",
};

const TotalHistoryComponent = ({ data, fetchData, title = "" }) => {
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    const dataArray = Array.isArray(data) ? data : [data];
    setTotalData(dataArray);
    // //console.log("Data total received:", dataArray);
  }, [data]);

  if (!totalData || totalData.length == 0) {
    return (
      <Card title={title} className="chart-card">
        <div style={{ textAlign: "center" }}>No data available</div>
      </Card>
    );
  }

  return (
    <Card
      title={title}
      className="chart-card"
      style={{
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 15px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <List
        itemLayout="vertical"
        dataSource={totalData}
        renderItem={(transaction) => (
          <List.Item key={transaction.orderNumber || transaction.total}>
            {Object.entries(transaction).map(([key, value]) => (
              <div
                key={`${transaction.orderNumber}-${key}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "18px",
                  backgroundColor: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                <Avatar
                  icon={icons[key]}
                  style={{
                    marginRight: "10px",
                    backgroundColor: iconBackgroundColors[key] || "#1890ff",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
                <Text strong style={{ fontSize: "16px", marginRight: "5px" }}>
                  {labels[key] || key}:
                </Text>
                <Text style={{ fontSize: "16px", color: "#595959" }}>
                  {value}
                </Text>
              </div>
            ))}
          </List.Item>
        )}
      />
    </Card>
  );
};

TotalHistoryComponent.propTypes = {
  data: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default TotalHistoryComponent;
