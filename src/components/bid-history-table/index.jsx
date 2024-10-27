import React from "react";
import { Table, Typography } from "antd";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const BidHistoryTable = ({ data }) => {
  //gimme some data
  const data1 = [
    {
      key: "1",
      bid: 1000,
      username: "John Brown",
      date: "2021-09-01T10:00:00Z",
    },
    {
      key: "2",
      bid: 1001,
      username: "Jim Green",
      date: "2021-09-01T10:01:00Z",
    },
    {
      key: "3",
      bid: 1002,
      username: "Joe Black",
      date: "2021-09-01T10:02:00Z",
    },
    {
      key: "4",
      bid: 1003,
      username: "Jim Red",
      date: "2021-09-01T10:03:00Z",
    },
  ];
  const columns = [
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      render: (text) => (
        <Text>{text ? `$${text.toLocaleString()}` : "Auction started"}</Text>
      ),
    },
    {
      title: "Bidder",
      dataIndex: "username",
      key: "username",
      render: (text) => <Text>{text || "N/A"}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
        dataSource={data1}
        pagination={false}
        bordered
        rowKey="date"
        style={{ backgroundColor: "#fff", borderRadius: "8px" }}
        scroll={{ y: 180 }} // Thiết lập chiều cao tối đa là 200px, nếu vượt quá sẽ có thanh cuộn
      />
    </div>
  );
};

export default BidHistoryTable;
