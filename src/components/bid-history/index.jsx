import { Table } from "antd";

const BidHistory = ({ bids }) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
  ];

  return <Table columns={columns} dataSource={bids} pagination={false} />;
};

export default BidHistory;
