import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";

const RejectModal = ({ userId, email, visible, onClose, onReject }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await onReject(userId, email, 2, values.text); // Calls the passed `onReject` function
      message.success("Rejection email sent successfully!");
      form.resetFields(); // Clear form fields after success
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to send rejection email:", error);
      message.error("Failed to send rejection email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Reject User"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit} // Properly calls `handleSubmit`
      >
        <Form.Item
          label="Message"
          name="text"
          rules={[{ required: true, message: "Please enter a reason for rejection!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter rejection reason" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RejectModal;
