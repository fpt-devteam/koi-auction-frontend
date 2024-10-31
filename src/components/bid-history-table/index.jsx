import React from "react";
import { Table, Typography } from "antd";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const BidHistoryTable = ({ data }) => {
  //gimme some data
  const columns = [
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
      key: "bidAmount",
      render: (text) => (
        <Text>{text ? `${text.toLocaleString()} VND` : "Auction started"}</Text>
      ),
    },
    {
      title: "Bidder",
      dataIndex: "bidderId",
      key: "bidderId",
      render: (text) => <Text>{text || "N/A"}</Text>,
    },
    {
      title: "Bid Time",
      dataIndex: "bidTime",
      key: "bidTime",
      render: (text) => <Text>{new Date(text).toLocaleString()}</Text>,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <Title level={4} style={{ textAlign: "left", marginBottom: "20px" }}>
        Bid History
      </Title>

      {/* Bảng lịch sử đấu giá */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowKey="bidTime"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
        scroll={{ y: 180 }} // Thiết lập chiều cao tối đa là 200px, nếu vượt quá sẽ có thanh cuộn
      />
    </div>
  );
};

export default BidHistoryTable;
