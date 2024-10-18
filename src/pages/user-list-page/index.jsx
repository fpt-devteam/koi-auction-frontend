import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, Space, message } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./index.css";
import userApi from "../../config/userApi";

export default function UserList ({number}) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use React Router's navigate

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userApi.get("manage/profile");
      const users = response.data;
      
      setUsers(users);
      const members = (users) => {
        return users.filter((user) => user.UserRoleId === number);
      }
      setUsers(members(users));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch auctions:", error); 
      message.error("Failed to load auction data.");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: <span className="titleName">User ID</span>,
      dataIndex: "UserId",
      key: "UserId",
    },
    {
      title: <span className="titleName">Username</span>,
      dataIndex: "Username",
      key: "UserId",
    },
    {
      title: <span className="titleName">First Name</span>,
      dataIndex: "FirstName",
      key: "UserId",
    },
    {
        title: <span className="titleName">Last Name</span>,
        dataIndex: "LastName",
        key: "UserId",
      },
    {
      title: <span className="titleName">Phone</span>,
      dataIndex: "Phone",
      key: "UserId",
    },
    {
      title: <span className="titleName">Email</span>,
      dataIndex: "Email",
      key: "UserId",
    },
    {
      title: <span className="titleName">User Role</span>,
      dataIndex: "UserRoleId",
      key: "UserId",
    },
    // {
    //     title: <span className="titleName">User ID</span>,
    //     dataIndex: "Active",
    //     key: "UserId",
    //   },
    {
      title: <span className="titleName">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            className="viewButton"
            onClick={() =>
              navigate("/admin/management/user-detail?id=" + record.UserId)
              //get above parameter in UserDetailPage 
              //const userId = new URLSearchParams(location.search).get("id");
              //fetchUser(userId);

            }
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    
    <div style={{ padding: "30px" }}>
      <h1 className="title">User List</h1>
      <Button>Create New User</Button>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="auctionId" //rowKey để xác định mỗi hàng trong bảng
        loading={loading}
        pagination={false}
        scroll={{ y: 600 }}
      />
    </div>
  );
};


