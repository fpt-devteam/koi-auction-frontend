import React, { useEffect, useState } from "react";
import { Form, message, Spin } from "antd";
import userApi from "../../config/userApi";
import UserDetailCard from "../../components/user-detail-card";
import "./index.css";
import ProfileForm from "../../components/profile-form-modal";
import { useLocation, useNavigate } from "react-router-dom";
import emailApi from "../../config/emailApi";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const userId = new URLSearchParams(window.location.search).get("id"); // Use window.location
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [seed, setSeed] = useState(0);
  //nhan gia tri isRequesting tu user-list-management qua navigate
  const { isRequesting } = location.state || false;

  const handleReset = () => {
    setSeed(seed + 1);
  };

  console.log("isRequesting", isRequesting);

  const handleApprove = async (userId, email, status) => {
    try {
      console.log("userId: ", userId);
      console.log("email: ", email);
      message.loading({ content: "Updating breeder...", key: "updatable" });

      const response = await userApi.patch(`verify-breeder/${userId}`, {
        Verified: status,
      });
      console.log(response.status);
      if (response.status === 201) {
        let subject, text;
        if (status == 1) {
          subject = "Your Farm Auction Account has been approved";
          text =
            "Your account has been approved by the admin. You can now login to your account and start using our services.";
        } else if (status == 2) {
          subject = "Your Farm Auction Account has been rejected";
          text =
            "Your account has been rejected by the admin. Please contact support for more information.";
        }
        const emailResponse = await emailApi.post("send-email", {
          Email: email,
          Subject: subject,
          Text: text,
        });
        console.log("da gui email", emailResponse);
        if (emailResponse.status === 200) {
          message.success({
            content: "Breeder update successfully!",
            key: "updatable",
            duration: 2,
          });
          // Set isRequesting to false here
          location.state.isRequesting = 1;

          fetchUser(userId);
          handleReset();
          //useNavigate("/management/request-list");
        }
      }
    } catch (error) {
      console.error("Error updating breeder:", error);
      message.error({
        content: "Failed to updating breeder",
        key: "updatable",
        duration: 2,
      });
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await userApi.get(`manage/detail-profile/${userId}`);
      setUser(response.data);

      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    } else {
      message.error("No user ID provided in the URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleFormSubmit = () => {
    // Show loading message
    form
      .validateFields()
      .then(async (values) => {
        try {
          message.loading({ content: "Updating user...", key: "updatable" });
          values.UserId = userId;
          values.Active = values.Active.toString();
          console.log(values.Active);

          const response = await userApi.patch(
            `manage/profile/${userId}`,
            values
          );
          console.log(response.data.message);
          console.log(values.Active);
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

  return loading ? (
    <Spin />
  ) : (
    <>
      <UserDetailCard
        data={user}
        loading={loading}
        openModal={() => setIsModalVisible(true)}
        title={`Information Details`}
        isRequesting={isRequesting}
        onApprove={() => handleApprove(user.UserId, user.Email, 1)}
        onReject={() => handleApprove(user.UserId, user.Email, 2)}
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
          About: user.UserRoleId === 2 ? user.About : undefined,
        }}
        isBreeder={user.UserRoleId === 2}
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        handleFormSubmit={handleFormSubmit}
        isRequesting={isRequesting}
      />
    </>
  );
};

export default UserDetail;
