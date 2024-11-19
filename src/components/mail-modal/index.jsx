import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";

const SendEmailModal = ({ email, visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);


  const handleSendEmail = async (values) => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:3005/api/send-email",
        {
          Email: email,
          Subject: values.subject,
          Text: values.text,
        }
      );
      message.success("Email sent successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Send Email" open={visible} onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSendEmail}
        initialValues={{ email }}
      >
        {/* <Form.Item
          label="Recipient Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the recipient email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Recipient's email" />
        </Form.Item> */}

        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            { required: true, message: "Please enter the email subject!" },
          ]}
        >
          <Input placeholder="Email subject" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="text"
          rules={[{ required: true, message: "Please enter your message!" }]}
        >
          <Input.TextArea rows={4} placeholder="Email message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SendEmailModal;
