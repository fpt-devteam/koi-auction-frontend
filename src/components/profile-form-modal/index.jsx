import { Form, Input, Modal, Switch } from "antd";
import React from "react";

function ProfileForm({
  form,
  initialValues,
  handleFormSubmit,
  isModalVisible,
  onClose,
  isBreeder,
  isCreate
}) {
  return (
    <div>
      <Modal
        width={500}
        title={`User Details`}
        okText="Save"
        cancelText="Cancel"
        open={isModalVisible}
        onCancel={onClose}
        onOk={handleFormSubmit}
        isBreeder={isBreeder}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          form={form}
          size="middle"
          layout="horizontal"
          initialValues={initialValues}
        >
          <Form.Item
            label="Username"
            name="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
            readOnly={true}
          >
            {/* {isCreate && <Input disabled />} */}
            <Input size="small" {...(!isCreate && { disabled: true })} />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="FirstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="LastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item label="Active" name="Active" valuePropName="checked">
            <Switch size="middle" />
          </Form.Item>
          {isBreeder && (
            <>
              <Form.Item
                label="Farm Name"
                name="FarmName"
                rules={[
                  { message: "Please input the farm name!" },
                  { required: true },
                ]}
              >
                <Input size="small" />
              </Form.Item>
              <Form.Item
                label="Certificate"
                name="Certificate"
                rules={[
                  { message: "Please input the certificate!" },
                  { required: true },
                ]}
              >
                <Input size="small" />
              </Form.Item>
              <Form.Item
                label="About"
                name="About"
                rules={[
                  { message: "Please input the about section!" },
                  { required: true },
                ]}
              >
                <Input.TextArea size="small" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}

export default ProfileForm;
