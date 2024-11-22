import React, { useState } from "react";
import { Form, Input, Button, message, Col, Row } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./index.css";
import userApi from "../../config/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";

const ChangePasswordForm = ({ cancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    userApi.post("/logout");
    dispatch(logout());
    navigate("/");
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      message.loading({ content: "Loading...", key: "change-password" });
      const newPassword = {
        Password: values.newPassword,
        CurrentPassword: values.currentPassword,
      };
      await userApi.patch("/update-password", newPassword);
      message.success({
        content: "Password changed successfully!",
        key: "change-password",
        duration: 2,
      });
      logoutUser();
      form.resetFields();
    } catch (error) {
      message.error({
        content: error.response.data.message,
        key: "change-password",
        duration: 2,
      });
    } finally {
      message.destroy("change-password");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="change-password-form">
        <Form
          form={form}
          name="change-password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Current Password"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
              {
                pattern: /^(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]{8,}$/,
                message:
                  "Password must be at least 8 characters long, contain at least one special character, and must not include spaces.",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") == value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Row>
              <Col span={10}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Change Password
                </Button>
              </Col>
              <Col span={14}>
                <Button onClick={cancel}>Cancel</Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ChangePasswordForm;
