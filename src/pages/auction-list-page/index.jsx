import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, Space, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(moment()); // Current time for countdown
  const navigate = useNavigate(); // Use React Router's navigate

  useEffect(() => {
    fetchAuctions();
    // const interval = setInterval(() => {
    //   setNow(moment());
    // }, 1000);

    // return () => clearInterval(interval); //xóa interval khi component unmount tức là khi component bị xóa khỏi DOM
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/auctions");
      const data = response.data;
      const now = moment();
      // Past auction là endtime ko null
      const past = data.filter(
        (auction) => auction.endTime && moment(auction.startTime).isBefore(now)
      );

      // Update states
      setAuctions(data);
      setPastAuctions(past);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch auctions:", error);
      message.error("Failed to load auction data.");
      setLoading(false);
    }
  };
  console.log("auctions", auctions);
  // Function to calculate the live countdown (days, hours, minutes, seconds)
  const calculateCountdown = (startTime) => {
    const duration = moment.duration(moment(startTime).diff(now));
    if (duration.asSeconds() <= 0) {
      return (
        <div className="countdown-0">
          <span className="third">0d</span>
          <span className="third">0h</span>
          <span className="third">0m</span>
          <span className="third">0s</span>
        </div>
      ); // If countdown has reached 0, show this
    }
    return (
      <div className="countdown">
        <span className="second">{Math.floor(duration.asDays())}d</span>
        <span className="second">{duration.hours()}h</span>
        <span className="second">{duration.minutes()}m</span>
        <span className="second">{duration.seconds()}s</span>
      </div>
    );
  };

  // Hàm lấy trạng thái của đấu giá
  const getStatus = (startTime, endTime) => {
    if (endTime) return "Ended";
    if (moment(startTime).isBefore(now)) return "Ongoing";
    return "Upcoming";
  };

  // Columns for ongoing/upcoming auctions with status
  const columns = [
    {
      title: <span className="titleName">Auction Name</span>,
      dataIndex: "auctionName",
      key: "auctionName",
    },
    {
      title: <span className="titleName">Start Time</span>,
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => moment(text).format("HH:mm | DD-MM-YYYY"),
    },
    {
      title: <span className="titleName">Before start</span>,
      key: "countdown",
      render: (_, record) => {
        return <div>{calculateCountdown(record.startTime)}</div>;
      },
    },
    {
      title: <span className="titleName">Status</span>,
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            getStatus(record.startTime, record.endTime) === "Ongoing"
              ? "green"
              : getStatus(record.startTime, record.endTime) === "Upcoming"
              ? "blue"
              : "red"
          }
        >
          {getStatus(record.startTime, record.endTime)}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <Space>
          {getStatus(record.startTime, record.endTime) === "Ongoing" ? (
            <Button
              className="joinButton"
              onClick={() => navigate("/auction-detail", { state: { auction: record } })}
            >
              Join Auction
            </Button>
          ) : (
            <Button
              className="viewButton"
              onClick={() => navigate("/auction-detail", { state: { auction: record } })}
            >
              View Details
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Columns for past auctions
  const pastColumns = [
    {
      title: <span className="titleName">Auction Name</span>,
      dataIndex: "auctionName",
      key: "auctionName",
    },
    {
      title: <span className="titleName">Start Time</span>,
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => moment(text).format("HH:mm | DD-MM-YYYY"),
    },
    {
      title: <span className="titleName">End Time</span>,
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => moment(text).format("HH:mm | DD-MM-YYYY"),
    },
    {
      title: <span className="titleName">Status</span>,
      key: "status",
      render: (_, record) => (
        <Tag
          color={
            getStatus(record.startTime, record.endTime) === "Ongoing"
              ? "blue"
              : getStatus(record.startTime, record.endTime) === "Upcoming"
              ? "green"
              : "red"
          }
        >
          {getStatus(record.startTime, record.endTime)}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Actions</span>,
      key: "actions",
      render: (
        _,
        record //tại sao lại là (_, record) ? vì record là dữ liệu của mỗi hàng trong bảng, còn _ là dữ liệu của cột
      ) => (
        <Space>
          <Button
            className="viewButton"
            onClick={() => navigate("/auction-detail", { state: { auction: record } })}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: <span className="custom-tab">Ongoing & Upcoming Auctions</span>,
      children: (
        <Table
          dataSource={auctions
            .filter((auction) => !auction.endTime)
            .sort((a, b) => moment(a.startTime).diff(moment(b.startTime)))}
          columns={columns}
          rowKey="auctionId"
          loading={loading}
          pagination={false}
          scroll={{ y: 600 }}
        />
      ),
    },
    {
      key: "2",
      label: <span className="custom-tab">Past Auctions</span>,
      children: (
        <Table
          dataSource={pastAuctions}
          columns={pastColumns}
          rowKey="auctionId" //rowKey để xác định mỗi hàng trong bảng
          loading={loading}
          pagination={false}
          scroll={{ y: 600 }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default AuctionList;
