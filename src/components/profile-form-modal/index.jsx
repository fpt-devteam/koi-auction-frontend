import { Col, Form, Input, Modal, Row, Select, Switch, Upload } from "antd";
import React from "react";
import UploadAvatar from "../upload-avatar";

function ProfileForm({
  form,
  initialValues,
  handleFormSubmit,
  isModalVisible,
  onClose,
  isCreate,
  isRequesting,
  provinceList,
  districtList,
  wardList,
  onSelectProvince,
  onSelectDistrict,
}) {
  console.log(provinceList);
  const { Option } = Select;

  const noSpacesRule = { pattern: /^\S*$/, message: "No spaces are allowed!" };
  const noLeadingTrailingSpacesRule = {
    pattern: /^\S.*\S$|^\S$/,
    message: "No leading or trailing spaces are allowed!",
  };
  const isBreeder = initialValues?.UserRoleId === 2;

  return (
    <div>
      <Modal
        width={600}
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
            span: 24,
          }}
          // wrapperCol={{
          //   span: 24,
          // }}
          form={form}
          size="middle"
          layout="horizontal"
          initialValues={initialValues}
        >
          {isBreeder && (
            <Form.Item
              label="Avatar"
              name="Certificate"
              rules={[{ required: true, message: "Please upload an avatar!" }]}
            >
              <UploadAvatar />
            </Form.Item>
          )}

          <Form.Item
            label="Username"
            name="Username"
            rules={[
              { required: true, message: "Please input the username!" },
              noSpacesRule,
            ]}
            readOnly={true}
          >
            <Input size="small" {...(!isCreate && { disabled: true })} />
          </Form.Item>
          {isCreate && (
            <Form.Item
              label="Password"
              name="Password"
              rules={[
                { required: true, message: "Please input the password!" },
                noSpacesRule,
              ]}
            >
              <Input.Password size="small" />
            </Form.Item>
          )}
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[
                  { required: true, message: "Please input the first name!" },
                  noLeadingTrailingSpacesRule,
                ]}
              >
                <Input size="small" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[
                  { required: true, message: "Please input the last name!" },
                  noLeadingTrailingSpacesRule,
                ]}
              >
                <Input size="small" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
              noSpacesRule,
            ]}
            readOnly={true}
          >
            <Input size="small" disabled={true} />
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
              noSpacesRule,
            ]}
            readOnly={true}
          >
            <Input size="small" />
          </Form.Item>
          {isRequesting ? (
            <Form.Item
              hidden={true}
              label="Active"
              name="Active"
              valuePropName="checked"
            >
              <Switch size="middle" />
            </Form.Item>
          ) : (
            <Form.Item label="Active" name="Active" valuePropName="checked">
              <Switch size="middle" />
            </Form.Item>
          )}
          {isBreeder && (
            <>
              <Form.Item
                label="Farm Name"
                name="FarmName"
                rules={[
                  { message: "Please input the farm name!" },
                  { required: true },
                  noLeadingTrailingSpacesRule, 
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
                  //noLeadingTrailingSpacesRule,
                ]}
              >
                <Input.TextArea size="small" />
              </Form.Item>
            </>
          )}
          <Form.Item
            label="Address"
            name="Address"
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
          >
            <Input placeholder="Enter your home address" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Province"
                name="ProvinceCode"
                rules={[
                  {
                    required: true,
                    message: "Please select your province",
                  },
                ]}
              >
                <Select
                  placeholder="Select province"
                  onChange={onSelectProvince}
                >
                  {provinceList?.map((province) => (
                    <Option key={province.code} value={province.code}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="District"
                name="DistrictCode"
                rules={[
                  {
                    required: true,
                    message: "Please select your district",
                  },
                ]}
              >
                <Select
                  placeholder="Select district"
                  onChange={onSelectDistrict}
                >
                  {districtList?.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ward"
                name="WardCode"
                rules={[
                  {
                    required: true,
                    message: "Please select your ward",
                  },
                ]}
              >
                <Select placeholder="Select ward">
                  {wardList?.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default ProfileForm;
