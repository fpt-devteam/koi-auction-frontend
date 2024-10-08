import React from "react";
import { Form, Input, Button, Card, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss"; // Custom CSS for styling
import userApi from "../../config/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  const handleLogin = async (values) => {
    try {
      const response = await userApi.post('/login', {
        username: values.username,
        password: values.password,
        rememberMe: values.remember,
      }, {
        withCredentials: true,
      });
      console.log(response)
      if (response.status === 200) {
        console.log(response)
        const { user } = response.data;
        dispatch(loginSuccess({ user }));
        message.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        // Server-side error (received a response from the server)
        message.error(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // Network error (request was made but no response received)
        message.error('Network error. Please check your internet connection.');
      } else {
        // Other types of errors (coding issues, etc.)
        message.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <Card
        title="Log In"
        bordered={false}
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          name="login"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Remember Me */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>

          {/* Forgot Password and Register Link */}
          <p style={{ textAlign: "center" }}>
            Forgot your password? <a href="/forgot-password">Click here</a>.
          </p>
          <p style={{ textAlign: "center" }}>
            Don't have an account? <a href="/register">Create an account</a>.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
