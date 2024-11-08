import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './index.css';

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // TODO: Implement your forgot password API call here
            console.log('Forgot password form values:', values);
            message.success('Reset password instructions have been sent to your email');
        } catch (error) {
            message.error('Failed to process forgot password request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <Card title="Forgot Password" className="forgot-password-card">
                <Form
                    name="forgot-password-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input a valid email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                        >
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
