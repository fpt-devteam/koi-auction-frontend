import React from "react";
import { Form, Input, Button, message } from "antd";
import userApi from "../../config/userApi";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  // get params from url
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log("Reset password:", values);
      console.log("Token:", token);
      const response = await userApi.patch(`/reset-password/${token}`, {
        Password: values.newPassword,
      });

      if (response.status == 201) {
        message.success("Password has been reset successfully!");
        form.resetFields();
        navigate("/login");
      } else {
        message.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Reset Password</h1>
        <p style={styles.description}>
          Enter your new password below to reset your account password.
        </p>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please enter your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") == value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              style={styles.input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={styles.button}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    backgroundColor: "#f9fafc",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    marginBottom: "16px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    marginBottom: "24px",
    fontSize: "14px",
    color: "#666",
  },
  input: {
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    fontSize: "16px",
    fontWeight: "bold",
    height: "40px",
    borderRadius: "4px",
    backgroundColor: "#1890ff",
    borderColor: "#1890ff",
  },
};

export default ResetPasswordPage;
