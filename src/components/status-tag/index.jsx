import React from "react";
import { Tag } from "antd";

// Bản đồ trạng thái với màu sắc và nhãn
const statusMap = {
  Upcoming: { color: "blue", label: "Upcoming" },
  "Before Start": { color: "orange", label: "Before Start" },
  Ongoing: { color: "green", label: "Ongoing" },
  Ended: { color: "red", label: "Ended" },
};

// Bản đồ kích cỡ với kiểu dáng
const sizeMap = {
  small: { fontSize: "12px", padding: "2px 6px" },
  medium: { fontSize: "16px", padding: "4px 8px" },
  large: { fontSize: "20px", padding: "5px 10px" },
};

function StatusTag({ statusName, size = "medium" }) {
  const status = statusMap[statusName];
  const sizeStyle = sizeMap[size];

  if (!status) return null;

  return (
    <Tag color={status.color} style={{ ...sizeStyle }}>
      {status.label}
    </Tag>
  );
}

export default StatusTag;
