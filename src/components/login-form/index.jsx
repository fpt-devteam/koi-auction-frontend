import React from 'react';
import { Form, Input, Button, Card, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss'; // Custom CSS for styling

const LoginForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-form-container">
      <Card
        title="Log In"
        bordered={false}
        style={{
          maxWidth: 500,
          margin: '0 auto',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Form
          name="login"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your username" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
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
          <p style={{ textAlign: 'center' }}>
            Forgot your password? <a href="/forgot-password">Click here</a>.
          </p>
          <p style={{ textAlign: 'center' }}>
            Don't have an account? <a href="/register">Create an account</a>.
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
