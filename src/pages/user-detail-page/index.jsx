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
      const response = await userApi.get(`manage/profile/${userId}`);
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
    form //giải thích: form.validateFields() trả về một promise, nếu thành công thì thực hiện hàm then, nếu thất bại thì thực hiện hàm catch
      .validateFields()
      .then(async (values) => { //lấy giá trị từ form và gửi lên server
        try {
          // Show loading message
          message.loading({ content: "Updating user...", key: "updatable" });

          // Send PUT request to update user
          // const response = await userApi.patch(`manage/profile/${userId}`, values);

          // // Update user state with new data
          // setUser(response.data);

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
            content: "Failed to update user.",
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
          Username: user.Username,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          Phone: user.Phone,
          Active: user.Active,
          UserRoleId: user.UserRoleId,
        }}
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        handleFormSubmit={handleFormSubmit}
      />

    </>
  );
};

export default UserDetail;
