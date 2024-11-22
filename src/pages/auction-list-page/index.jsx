import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, Space, message, Statistic } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./index.css";
import lotApi from "../../config/lotApi";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [pastAuctions, setPastAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(moment()); // Current time for countdown
  const navigate = useNavigate(); // Use React Router's navigate

  //create data structure that like ["Ongoing"] = ["green"], ["Upcoming"] = ["blue"], ["Ended"] = ["red"]
  // i need a map to store the color of each status
  const statusColorMap = {
    Ongoing: "green",
    Upcoming: "blue",
    Ended: "red",
  };
  const getStatusColor = (status) => {
    return statusColorMap[status] || "defaultColor"; // Return a default color if status is not found
  };

  useEffect(() => {
    fetchAuctions();

    // const interval = setInterval(() => {
    //   const currentTime = moment();
    //   setNow(currentTime);

    //   // Kiểm tra xem có đấu giá nào bắt đầu hoặc kết thúc trong khoảng 10s trước hoặc sau thời gian hiện tại
    //   const upcomingAuction = auctions.find((auction) => {
    //     const startDiff = moment
    //       .duration(currentTime.diff(moment(auction.startTime)))
    //       .asSeconds();
    //     const endDiff = auction.endTime
    //       ? moment
    //           .duration(currentTime.diff(moment(auction.endTime)))
    //           .asSeconds()
    //       : null;

    //     return (
    //       Math.abs(startDiff) <= 10 || // Start time trong khoảng 10 giây trước hoặc sau
    //       (endDiff !== null && Math.abs(endDiff) <= 10) // End time trong khoảng 10 giây trước hoặc sau
    //     );
    //   });
    //   if (upcomingAuction) {
    //     fetchAuctions();
    //   }
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await lotApi.get("/auctions");
      const data = response.data.reverse();

      // Past auction là auction status là "Ended"
      const past = data
        .filter((auction) => auction.auctionStatus.auctionStatusName == "Ended")
        .sort((a, b) => moment(a.endTime).diff(moment(b.endTime)));

      // Ongoing & Upcoming auction là auction status khác "Ended"
      const ongoing_upcomming = data
        .filter(
          (auction) => auction.auctionStatus.auctionStatusName !== "Ended"
        )
        .sort((a, b) => moment(a.startTime).diff(moment(b.startTime)));

      // Update states
      setAuctions(ongoing_upcomming);
      setPastAuctions(past);
      setLoading(false);
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };
  // Function to calculate the live countdown (days, hours, minutes, seconds)
  const calculateCountdown = (startTime) => {
    const duration = moment.duration(moment(startTime).diff(now));
    // if (duration.asSeconds() <= 0) {
    //   return (
    //     <div className="countdown-0">
    //       <span className="third">0d</span>
    //       <span className="third">0h</span>
    //       <span className="third">0m</span>
    //       <span className="third">0s</span>
    //     </div>
    //   ); // If countdown has reached 0, show this
    // }
    return (
      // <div className="countdown">
      //   <span className="second">{Math.floor(duration.asDays())}d</span>
      //   <span className="second">{duration.hours()}h</span>
      //   <span className="second">{duration.minutes()}m</span>
      //   <span className="second">{duration.seconds()}s</span>
      // </div>
      <Statistic.Countdown
        value={moment(startTime).valueOf()}
        format="D[d] H[h] m[m] s[s]"
        valueStyle={{
          // fontSize: "14px",
          // color: "#1890ff",
          fontWeight: "bold",
          // color: "#fa8c16" /* Ant Design's orange color */,
          color: "red" /* Ant Design's red color */,
          fontSize: "16px",
          // backgroundColor: "#faedec",
          padding: "0 4px",
          borderRadius: "4px",
          margin: "0 2px",
        }}
      />
    );
  };

  const getColor = (auctionStatus) => {
    return statusColorMap[auctionStatus];
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
        <Tag color={getColor(record.auctionStatus.auctionStatusName)}>
          {record.auctionStatus.auctionStatusName}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.auctionStatus.auctionStatusName == "Ongoing" ? (
            <Button
              className="joinButton"
              onClick={() =>
                navigate(`/auction-detail/${record.auctionId}`, {
                  state: { auction: record },
                })
              }
            >
              Join Auction
            </Button>
          ) : (
            <Button
              className="viewButton"
              onClick={() =>
                navigate(`/auction-detail/${record.auctionId}`, {
                  state: { auction: record },
                })
              }
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
        <Tag color={getColor(record.auctionStatus.auctionStatusName)}>
          {record.auctionStatus.auctionStatusName}
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
            onClick={() =>
              navigate(`/auction-detail/${record.auctionId}`, {
                state: { auction: record },
              })
            }
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
          dataSource={auctions}
          // .filter((auction) => !auction.endTime)
          // .sort((a, b) => moment(a.startTime).diff(moment(b.startTime)))}
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
