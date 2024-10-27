import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, Space, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";
import userApi from "../../config/userApi";
import ProfileForm from "../../components/profile-form-modal";

export default function UserList({ number }) {
  console.log(number);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use React Router's navigate
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [number]);

  const handleFormSubmit = async () => {
    try {
      let values = await form.validateFields();
      message.loading({ content: "Creating user...", key: "updatable" });
      console.log(values);
      const response = await userApi.post("manage/profile", values);
      if (response.status === 201) {
        message.success({
          content: "User created successfully!",
          key: "updatable",
          duration: 2,
        });
        setIsModalVisible(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      message.error({
        content: error.response.data.message,
        key: "updatable",
        duration: 2,
      })
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await userApi.get("manage/profile");
      const users = response.data;
      console.log(users);
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
      title: <span className="titleName">Active</span>,
      dataIndex: "Active",
      key: "UserId",
      render: (active) => (
        <Tag color={active ? "green" : "red"} key={active}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: <span className="titleName">Role</span>,
      dataIndex: "UserRoleId",
      key: "UserId",
      render: (roleId) => (
        <Tag color={roleId === 1 ? "blue" : roleId === 2 ? "purple" : "orange"} key={roleId}>
          {roleId === 3 ? "Staff" : roleId === 2 ? "Breeder" : "User"}
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
              navigate("/admin/management/user-detail?id=" + record.UserId)
            }
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (

    <div  >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0',
        marginRight: '20px',
        marginBottom: '20px',
      }}>
        <h1 className="title">{number === 2 ? "Breeder" : number === 1 ? "User" : "Staff"} List</h1>
        <Button size="large" type="primary" onClick={() => { setIsCreate(true); setIsModalVisible(true); }}>
          Create New {number === 2 ? "Breeder" : number === 1 ? "User" : "Staff"}
        </Button>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="auctionId" //rowKey để xác định mỗi hàng trong bảng
        loading={loading}
        pagination={false}
        scroll={{ y: 600 }}
      />
      <ProfileForm
        form={form}
        handleFormSubmit={handleFormSubmit}
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isBreeder={number === 2}
        isCreate={isCreate}
      />
    </div>
  );
};


