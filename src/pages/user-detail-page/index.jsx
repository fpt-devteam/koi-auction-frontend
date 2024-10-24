import React, { useEffect, useState } from "react";
import {
  Descriptions,
  Badge,
  Card,
  Button,
  Modal,
  Form,
  Input,
  Switch,
  message,
  Spin,
} from "antd";
import userApi from "../../config/userApi";
import UserDetailCard from "../../components/user-detail-card";
import "./index.css";
import ProfileForm from "../../components/profile-form-modal";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const userId = new URLSearchParams(window.location.search).get("id"); // Use window.location
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const fetchUser = async (userId) => {
    try {
      const response = await userApi.get(`manage/detail-profile/${userId}`);
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      setLoading(false);
    } else {
      message.error("No user ID provided in the URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleFormSubmit = () => {

    // Show loading message
    message.loading({ content: "Updating user...", key: "updatable" });
    form
      .validateFields()
      .then(async (values) => {
        try {
          values.UserId = userId;
          const response = await userApi.patch(`manage/profile/${userId}`, values);
          console.log(response.data.message);
          console.log(values);
          fetchUser(userId);

          // Show success message
          message.success({
            content: "User updated successfully!",
            key: "updatable",
            duration: 2,
          });

          // Close the modal
          setIsModalVisible(false);
        } catch (error) {
          console.error("Error updating user:", error);
          message.error({
            content: error.response.data.message || "Failed to update user",
            key: "updatable",
            duration: 2,
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}><span><Spin />  </span>Loading...</div>
    );
  }

  return (
    <>
      <UserDetailCard
        data={user}
        loading={loading}
        openModal={() => setIsModalVisible(true)}
        title="User Details"
      />

      <ProfileForm
        form={form}
        initialValues={{
          UserId: user.UserId,
          Username: user.Username,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Phone: user.Phone,
          Active: user.Active,
          UserRoleId: user.UserRoleId,
          FarmName: user.UserRoleId === 2 ? user.FarmName : undefined,
          Certificate: user.UserRoleId === 2 ? user.Certificate : undefined,
          About: user.UserRoleId === 2 ? user.About : undefined
        }}
        isBreeder={user.UserRoleId === 2}
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
};

export default UserDetail;
