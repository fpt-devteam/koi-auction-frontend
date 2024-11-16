import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserListMng({ users, loading, isRequesting, onApprove }) {
  const navigate = useNavigate();
  if (isRequesting) {
    users = users.filter((user) => user.Verified === false);
  } else {
    users = users.filter((user) => user.Verified === true);
  }
  console.log("isRequesting", isRequesting);
  const columns = [
    {
      title: <span className="titleName">User ID</span>,
      dataIndex: "UserId",
      key: "UserId",
      width: 100,
    },
    {
      title: <span className="titleName">Username</span>,
      dataIndex: "Username",
      key: "Username",
      width: 170,
    },
    {
      title: <span className="titleName">First Name</span>,
      dataIndex: "FirstName",
      key: "FirstName",
      width: 170,
    },
    {
      title: <span className="titleName">Last Name</span>,
      dataIndex: "LastName",
      key: "LastName",
      width: 150,
    },
    {
      title: <span className="titleName">Phone</span>,
      dataIndex: "Phone",
      key: "Phone",
      width: 130,
    },
    {
      title: <span className="titleName">Email</span>,
      dataIndex: "Email",
      key: "Email",
    },

    {
      title: <span className="titleName">Active</span>,
      dataIndex: "Active",
      key: "Active",
      width: 100,
      render: (active) => (
        <Tag color={active ? "green" : "red"} key={active}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Verified</span>,
      dataIndex: "Verified",
      key: "Verified",
      width: 100,
      render: (verified) => (
        <Tag color={verified ? "green" : "red"} key={verified}>
          {verified ? "Approved" : "Pending"}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            className="viewButton"
            onClick={() =>
              navigate("/management/user-detail?id=" + record.UserId, {state: {isRequesting: isRequesting}})
            }
          >
            Details
          </Button>
          {isRequesting && (
            <Button
              className="approveButton"
              onClick={() => onApprove(record.UserId, record.Email)}
            >
              Approve
            </Button>
          )}
        </Space>
      ),
    },
  ];
  const displayColumns = isRequesting
    ? columns.filter((col) => col.key !== "Active")
    : columns.filter((col) => col.key !== "Verified");
  return (
    <Table
      dataSource={users}
      columns={displayColumns}
      rowKey="UserId" //rowKey để xác định mỗi hàng trong bảng
      loading={loading}
      pagination={true}
      scroll={{ y: 600 }}
    />
  );
}

export default UserListMng;
