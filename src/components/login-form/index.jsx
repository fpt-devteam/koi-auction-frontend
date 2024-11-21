import {
  Form,
  Input,
  Button,
  Card,
  Checkbox,
  message,
  Flex,
  Divider,
  Image,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss"; // Custom CSS for styling
import userApi from "../../config/userApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/features/userSlice";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${response.access_token}` } }
      );
      // //console.log(userInfo.data);
      const { email, family_name, given_name, sub } = userInfo.data;
      const loginResponse = await userApi.post(
        "/auth/google",
        {
          Email: email,
          FirstName: given_name,
          LastName: family_name,
          GoogleId: sub,
        },
        { withCredentials: true }
      );
      // //console.log(loginResponse.data);
      setLoading(false);
      if (loginResponse.status == 200) {
        let { user } = loginResponse.data;
        user.UserRoleId = 1;

        dispatch(loginSuccess({ user }));
        setTimeout(() => {
          message.success("Login successful!");
        }, 1000);
        navigate("/");
      }
    },
    onError: (error) => {
      // //console.log(error);
    },
  });

  const onFinishFailed = (errorInfo) => {
    // //console.log('Failed:', errorInfo);
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log("asfas", userApi);
      const response = await userApi.post(
        "/login",
        {
          Username: values.username,
          Password: values.password,
          RememberMe: values.remember,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      // //console.log(response);
      if (response.status == 200) {
        const { user } = response.data;

        dispatch(loginSuccess({ user }));
        setTimeout(() => {
          message.success("Login successful!");
        }, 1000);

        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server-side error (received a response from the server)
        message.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        // Network error (request was made but no response received)
        // message.error('Network error. Please check your internet connection.');
      } else {
        // Other types of errors (coding issues, etc.)
        // message.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <Card
        title={
          <span style={{ fontWeight: "550", fontSize: "24px" }}>Log In</span>
        }
        bordered={false}
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form
          name="login"
          layout="vertical"
          style={{ width: "27rem" }}
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
            style={{ marginBottom: "5px" }}
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
          {/* <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="/forgot-password">Forgot your password? </a>.
            </Flex>
          </Form.Item> */}
          <Form.Item style={{ marginTop: "0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="/forgot-password">Forgot your password?</a>
            </div>
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isLoading}
              style={{ fontWeight: "500", height: "40px" }}
            >
              Log In
            </Button>
          </Form.Item>
          <Divider orientation="left" plain>
            Or login with
          </Divider>
          {/* Google Login */}
          <div className="icon-login-container">
            <GoogleLogin
              className="icon-login-button"
              buttonText="Login with Google"
              onSuccess={() => googleLogin()}
              onFailure={() => googleLogin()}
              size="large"
            />
          </div>
          {/* Forgot Password and Register Link */}
          <p style={{ textAlign: "center" }}>
            Don&apos;t have an account? <a href="/register">Create account</a>.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
