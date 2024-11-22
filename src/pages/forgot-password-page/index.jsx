import React from "react";
import { Form, Input, Button, message } from "antd";
import userApi from "../../config/userApi";

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // Simulate API call
      const response = await userApi.post("/forgot-password", values);
      if (response.status == 200) {
        message.success("Password reset link sent to your email!");
        form.resetFields();
      } else {
        message.error("Failed to send password reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Forgot Password</h1>
        <p style={styles.description}>
          Enter your email address below to receive a password reset link.
        </p>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email Address"
            name="Email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              { type: "Email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Enter your email" style={styles.input} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={styles.button}
            >
              Send Reset Link
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
    backgroundColor: "#f0f2f5",
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
  },
};

export default ForgotPasswordPage;
