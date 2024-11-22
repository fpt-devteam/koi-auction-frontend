import { Button, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RejectModal from "../reject-modal";

function UserListMng({ users, loading, isRequesting, onApprove, onReject }) {
  const navigate = useNavigate();
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Track the user being rejected

  // Filter users based on `isRequesting`
  if (isRequesting == 0) {
    users = users.filter((user) => user.Verified == 0);
  } else if (isRequesting == 1) {
    users = users.filter((user) => user.Verified == 1);
  } else if (isRequesting == 2) {
    users = users.filter((user) => user.Verified == 2);
  }

  const columns = [
    {
      title: <span className="titleName">User ID</span>,
      dataIndex: "UserId",
      key: "UserId",
      width: 110,
      sorter: (a, b) => a.UserId - b.UserId,
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
      sorter: (a, b) => Number(a.Active) - Number(b.Active),
    },
    {
      title: <span className="titleName">Verified</span>,
      dataIndex: "Verified",
      key: "Verified",
      width: 100,
      render: (verified) => (
        <>
          {verified == 0 && (
            <Tag color="blue" key="pending">
              Pending
            </Tag>
          )}
          {verified == 1 && (
            <Tag color="green" key="approved">
              Approved
            </Tag>
          )}
          {verified == 2 && (
            <Tag color="red" key="rejected">
              Rejected
            </Tag>
          )}
        </>
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
              navigate("/management/user-detail?id=" + record.UserId, {
                state: { isRequesting: isRequesting },
              })
            }
          >
            Details
          </Button>
          {isRequesting == 0 && (
            <>
              <Button
                className="approveButton"
                onClick={() => onApprove(record.UserId, record.Email, 1)}
              >
                Approve
              </Button>
              <Button
                className="rejectButton"
                onClick={() => {
                  setSelectedUser(record); // Set the user to be rejected
                  setRejectModalVisible(true); // Show the modal
                }}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const displayColumns =
    isRequesting !== 1
      ? columns.filter((col) => col.key !== "Active")
      : columns.filter((col) => col.key !== "Verified");

  return (
    <>
      <Table
        dataSource={users}
        columns={displayColumns}
        rowKey="UserId"
        loading={loading}
        pagination={true}
        scroll={{ y: 600 }}
      />
      {selectedUser && (
        <RejectModal
          userId={selectedUser.UserId}
          email={selectedUser.Email}
          visible={isRejectModalVisible}
          onClose={() => setRejectModalVisible(false)} // Close modal
          onReject={onApprove} // Pass the rejection function
        />
      )}
    </>
  );
}

export default UserListMng;
