import { Form, Input, Modal, Switch } from "antd";
import React from "react";

function ProfileForm({
  form,
  initialValues,
  handleFormSubmit,
  isModalVisible,
  onClose,
}) {
  
  return (
    <div>
      <Modal
        width={800}
        title="Edit User Details"
        okText="Save"
        cancelText="Cancel"
        open={isModalVisible}  
        onCancel={onClose}   
        onOk={handleFormSubmit}           
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item
            label="Username"
            name="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
            readOnly={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="FirstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="LastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Active" name="Active" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
          <Form.Item
            label="User Role ID"
            name="UserRoleId"
            rules={[
              { required: true, message: "Please input the user role ID!" },
            ]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item
            label="Balance"
            name="Balance"
            rules={[
              { required: true, message: "Please input the balance!" },
              {
                type: "number",
                min: 0,
                message: "Balance cannot be negative!",
              },
            ]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfileForm;
