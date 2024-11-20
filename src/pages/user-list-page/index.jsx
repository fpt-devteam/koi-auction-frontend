import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, Space, message, Form } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.css";
import userApi from "../../config/userApi";
import ProfileForm from "../../components/profile-form-modal";
import UserListMng from "../../components/user-list-management";
import emailApi from "../../config/emailApi";


export default function UserListPage({ number, isRequest }) {
  // //console.log(number);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use React Router's navigate
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [seed, setSeed] = useState(0);

  const handleReset = () => {
    setSeed(seed + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [number, seed]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const fetchUsers = async () => {
    try {
      const response = await userApi.get("manage/profile");
      const users = response.data;
      // //console.log(users);
      setUsers(users);
      const members = (users) => {
        return users.filter((user) => user.UserRoleId === number);
      };
      setUsers(members(users));
      setLoading(false);
    } catch (error) {
      // //console.error("Failed to fetch auctions:", error);
      message.error("Failed to load auction data.");
      setLoading(false);
    }
  };


  const handleApprove = async (userId, email, status) => {
    try {
      // //console.log("userId: ", userId);
      // //console.log("email: ", email);
      // //console.log("status: ", status);
      message.loading({ content: "Updating breeder...", key: "updatable" });

      const response = await userApi.patch(`verify-breeder/${userId}`, {
        Verified: status,
      });
      // //console.log(response.status);
      if (response.status === 201) {
        let subject, text;
        if (status == 1) {
          subject = "Your Farm Auction Account has been approved";
          text = "Your account has been approved by the admin. You can now login to your account and start using our services.";
        } else if (status == 2) {
          subject = "Your Farm Auction Account has been rejected";
          text = "Your account has been rejected by the admin. Please contact support for more information.";
        }
        const emailResponse = await emailApi.post("send-email", {
          Email: email,
          Subject: subject,
          Text: text,
        });
        // //console.log("da gui email", emailResponse);
        if (emailResponse.status === 200) {
          message.success({
            content: "Breeder update successfully!",
            key: "updatable",
            duration: 2,
          });
          fetchUsers();
          handleReset();
        }
      }
    } catch (error) {
      // //console.error("Error updating breeder:", error);
      message.error({
        content: "Failed to updating breeder",
        key: "updatable",
        duration: 2,
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      let values = await form.validateFields();
      let newUser = { ...values, UserRoleId: number };
      message.loading({ content: "Creating user...", key: "updatable" });
      // //console.log(newUser);
      const response = await userApi.post("manage/profile", newUser);
      if (response.status === 201) {
        message.success({
          content: "User created successfully!",
          key: "updatable",
          duration: 2,
        });
        setIsModalVisible(false);
        form.resetFields();
        handleReset();
        // setUsers([...users, response.data]);
      }
    } catch (error) {
      // //console.error("Failed to create user:", error);
      message.error({
        content: error.response.data.message,
        key: "updatable",
        duration: 2,
      });
    }
  };

  return (
    <div key={seed}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0",
          marginRight: "20px",
          marginBottom: "20px",
          // backgroundColor: "red",
        }}
      >
        <h1 className="title" style={{ fontSize: "30px" }}>
          {number === 2 ? "Breeder" : number === 1 ? "User" : "Staff"} List
        </h1>
        {number === 3 && (
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setIsCreate(true);
              setIsModalVisible(true);
            }}
          >
            Create New Staff
          </Button>
        )}
      </div>
      {number === 2 && (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            // backgroundColor: "blue",
          }}
        >
          <Button
            style={{ color: "black", borderColor: "black" }}
            size="large"
            type="link"
            onClick={() => {
              navigate("/management/request-list");
            }}
          >
            Pending
          </Button>
          <Button
            style={{ color: "black", borderColor: "black" }}
            size="large"
            type="link"
            onClick={() => {
              navigate("/management/breeder-list");
            }}
          >
            Approve
          </Button>
          <Button
            style={{ color: "black", borderColor: "black" }}
            size="large"
            type="link"
            onClick={() => {
              navigate("/management/rejected-breeder-list");
            }}
          >
            Rejected
          </Button>
        </div>
      )}
      <UserListMng
        users={users}
        loading={loading}
        onApprove={handleApprove}
        isRequesting={isRequest}
      />
      <ProfileForm
        form={form}
        handleFormSubmit={handleFormSubmit}
        isModalVisible={isModalVisible}
        onClose={handleCloseModal}
        isBreeder={number === 2}
        isCreate={isCreate}
      />
    </div>
  );
}
