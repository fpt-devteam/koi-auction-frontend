import { Form, Input, Button, Checkbox, Card, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./index.scss"; // Custom CSS for styling
import userApi from "../../config/userApi";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      // Submit the form data to the back-end API
      const response = await userApi.post("user-service/register", {
        firstname: values.firstName,
        lastname: values.lastName,
        username: values.username,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        message.success("Registration successful! Please log in.");
        setTimeout(() => {
          navigate('/login');
        }, 1000) 
      }
    } catch (error) {
      if (error.response) {
        message.error(
          error.response.data.message || "Register failed. Please try again."
        );
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-form-container">
      <Card
        className="res-card"
        title={<p className="register-form-title">Create an Account</p>}
        bordered={false}
        style={{
          width: 600,
          maxWidth: 700,
          margin: "0 auto",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          name="register"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={handleRegister}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* First Name */}
          <Form.Item
            className="form-item"
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input className="res-input" placeholder="Enter your first name" />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            className="form-item"
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input className="res-input" placeholder="Enter your last name" />
          </Form.Item>

          {/* Username */}
          <Form.Item
            className="form-item"
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              className="res-input"
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            className="form-item"
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
              {
                pattern: /^[0-9]{10}/,
                message: "Phone number must be 10 numbers!",
              },
            ]}
          >
            <Input
              className="res-input"
              prefix={<PhoneOutlined />}
              placeholder="Enter your phone number"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            className="form-item"
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              { type: "email", message: "The input is not a valid E-mail!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            className="form-item"
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              className="res-input"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            className="form-item"
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="res-input"
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          {/* Checkbox */}
          <Form.Item
            className="form-item"
            name="agreement"
            valuePropName="checked"
          >
            <Checkbox>I agreed with company policies and terms.</Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="form-item">
            <Button className="res-btn" type="primary" htmlType="submit" block>
              Create an account
            </Button>
          </Form.Item>

          <p style={{ textAlign: "center" }}>
            Already have an account? <a href="/login">Log in</a>.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm;
