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
} from "antd";
import userApi from "../../config/userApi";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const userId = new URLSearchParams(window.location.search).get("id"); // Use window.location
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
    } else {
      message.error("No user ID provided in the URL.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        try {
          // Show loading message
          message.loading({ content: "Updating user...", key: "updatable" });

          // Send PUT request to update user
          const response = await userApi.patch(`manage/profile/${userId}`, values);

          // Update user state with new data
          setUser(response.data);

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
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  return (
    <>
      <Card
        title="User Details"
        style={{ maxWidth: 600, margin: "auto", alignItems: "center" }}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="User ID">{user.UserId}</Descriptions.Item>
          <Descriptions.Item label="Username">{user.Username}</Descriptions.Item>
          <Descriptions.Item label="First Name">
            {user.FirstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {user.LastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.Email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.Phone}</Descriptions.Item>
          <Descriptions.Item label="Active">
            <Badge
              status={user.Active ? "success" : "error"}
              text={user.Active ? "Active" : "Inactive"}
            />
          </Descriptions.Item>
          <Descriptions.Item label="User Role ID">
            {user.UserRoleId}
          </Descriptions.Item>
          <Descriptions.Item label="Balance">
            ${user.Balance.toFixed(2)}
          </Descriptions.Item>
        </Descriptions>
          <Button type="primary" className="update-button" onClick={() => setIsModalVisible(true)}>
            Update
          </Button>
      </Card>

      <Modal
        width={800}
        title="Edit User Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleFormSubmit}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            Username: user.Username,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Phone: user.Phone,
            Active: user.Active,
            UserRoleId: user.UserRoleId,
          }}
        >
          <Form.Item
            label="Username"
            name="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="FirstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="LastName"
            rules={[
              { required: true, message: "Please input the last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Active" name="Active" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
          <Form.Item
            label="User Role ID"
            name="UserRoleId"
            rules={[
              { required: true, message: "Please input the user role ID!" },
            ]}
          >
          <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            label="Balance"
            name="Balance"
            rules={[
              { required: true, message: "Please input the balance!" },
              { type: "number", min: 0, message: "Balance cannot be negative!" },
            ]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserDetail;
