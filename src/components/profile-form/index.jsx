import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Input,
  Select,
  Button,
  message,
  Spin,
  Modal,
  Avatar,
  Image,
} from "antd";
import { useForm } from "antd/es/form/Form";
import addressApi from "../../config/addressApi";
import userApi from "../../config/userApi";
import "./index.css";
import { UserOutlined } from "@ant-design/icons";

const { Option } = Select;
import "./index.css";
import ChangePasswordForm from "../change-password-form";
const imageExample =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

export default function GeneralInfoForm({ user, refresh }) {
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  const [isBreeder, setIsBreeder] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [breederInfo, setBreederInfo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const handleModelOk = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      setIsBreeder(user.UserRoleId === 2);
      initializeFormData();
      if (user.UserRoleId === 2) {
        fetchBreederData();
      }
    }
  }, [user]);

  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWards(districtId);
    }
  }, [districtId]);

  const fetchBreederData = async () => {
    try {
      const response = await userApi.get(`/breeder/profile`);
      console.log(response);
      form.setFieldsValue({
        BreederId: response.data.BreederId,
        FarmName: response.data.FarmName,
        Certificate: response.data.Certificate,
        About: response.data.About,
      });
      setBreederInfo(response.data);
    } catch (error) {
      console.error("Error fetching breeder data:", error);
      message.error("Failed to load breeder data");
    }
  };
  const initializeFormData = async () => {
    try {
      const [provinces, districts, wards] = await Promise.all([
        fetchProvinces(),
        fetchDistricts(user.ProvinceCode),
        fetchWards(user.DistrictCode),
      ]);
      console.log(provinces, districts, wards);
      setProvinceList(provinces);
      setDistrictList(districts);
      setWardList(wards);
      setInitialLoading(false);
    } catch (error) {
      console.error("Error initializing form data:", error);
      message.error("Failed to load initial data");
    }
  };

  useEffect(() => {
    if (!initialLoading && user) {
      form.setFieldsValue({
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Phone: user.Phone,
        Address: user.Address,
        ProvinceCode: user.ProvinceCode,
        DistrictCode: user.DistrictCode,
        WardCode: user.WardCode,
      });
      setLoading(false);
      form.validateFields(["DistrictCode"]);
    }
  }, [initialLoading, user]);

  const fetchProvinces = async () => {
    try {
      const response = await addressApi.get("province");
      setProvinceList(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      message.error("Failed to load provinces");
    }
  };

  const fetchDistricts = async (provinceCode) => {
    if (provinceCode) {
      try {
        const response = await addressApi.get(`district/${provinceCode}`);
        setDistrictList(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching districts:", error);
        message.error("Failed to load districts");
      }
    }
  };

  const fetchWards = async (districtCode) => {
    if (districtCode) {
      try {
        const response = await addressApi.get(`ward/${districtCode}`);
        setWardList(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching wards:", error);
        message.error("Failed to load wards");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form data to submit:", values);
      if (isBreeder) {
        values.BreederId = values.BreederId;
      }
      const response = await userApi.patch(`update-profile`, values);
      console.log("Response:", response);
      refresh();
      setIsEditing(false);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    refresh();
  };

  const handleSelectProvince = (value) => {
    form.setFieldsValue({ DistrictCode: undefined, WardCode: undefined });
    setProvinceId(value);
  };

  const handleSelectDistrict = (value) => {
    form.setFieldsValue({ WardCode: undefined });
    setDistrictId(value);
  };

  return loading ? (
    <Spin />
  ) : (
    <>
      <Card
        size="medium"
        className="card"
        bordered={false}
        style={{ width: "900px" }}
        title={
          isBreeder ? (
            <>
              <Image src={breederInfo?.Certificate} width={"50em"} />
              <br />
              <span
                style={{
                  fontSize: "34px",
                  fontWeight: "bold",
                  padding: "20px",
                  color: " rgb(255, 77, 79)",
                }}
              >
                {breederInfo?.FarmName}
              </span>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "40px",
              }}
            >
              <Avatar
                size={64}
                icon={<UserOutlined />}
                src={user?.Avatar}
                style={{
                  backgroundColor: "#1890ff",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                {`${user?.FirstName} ${user?.LastName}'s Profile`}
              </span>
            </div>
          )
        }
      >
        <Form form={form} layout="vertical">
          {isBreeder && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Farm Name"
                  name="FarmName"
                  rules={[
                    { required: true, message: "Please enter your Farm Name" },
                  ]}
                >
                  <Input
                    placeholder="Enter your Farm Name"
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  disabled={!isEditing}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  disabled={!isEditing}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input placeholder="example@gmail.com" disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="Phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="+84 - 345 678 910" disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>

          {isBreeder && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="About" name="About">
                  <Input.TextArea
                    placeholder="Enter information about your farm"
                    disabled={!isEditing}
                    style={{ height: "10em" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Address" name="Address">
                <Input
                  placeholder="Enter your home address"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Province" name="ProvinceCode">
                <Select
                  placeholder="Select province"
                  onChange={handleSelectProvince}
                  disabled={true}
                >
                  {provinceList?.map((province) => (
                    <Option key={province.code} value={province.code}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="District" name="DistrictCode">
                <Select
                  placeholder="Select district"
                  onChange={handleSelectDistrict}
                  disabled={true}
                >
                  {districtList?.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Ward" name="WardCode">
                <Select placeholder="Select ward" disabled={true}>
                  {wardList?.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Button onClick={() => setIsModalVisible(true)}>
                Change Password
              </Button>
              <Modal
                footer={null}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                style={{ width: "fit-content", height: "fit-content" }}
              >
                <ChangePasswordForm cancel={() => setIsModalVisible(false)} />
              </Modal>
            </Col>

            <Col span={12} style={{ textAlign: "right" }}>
              {!isEditing && (user.UserRoleId == 4 || user.UserRoleId == 1) && (
                <Button type="primary" onClick={() => setIsEditing(true)}>
                  Update
                </Button>
              )}
              {isEditing && (user.UserRoleId == 4 || user.UserRoleId == 1) && (
                <>
                  <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                    Cancel
                  </Button>
                  <Button type="primary" onClick={handleSubmit}>
                    Save
                  </Button>
                </>
              )}
              {(user.UserRoleId == 2 || user.UserRoleId == 3) && (
                <Button type="primary" onClick={showModal}>
                  Update
                </Button>
              )}
              <Modal
                title="Contact Information"
                open={isOpen}
                onOk={handleModelOk}
                onCancel={handleModelOk}
                footer={[
                  <Button key="submit" onClick={handleModelOk}>
                    OK
                  </Button>,
                ]}
              >
                <p>
                  If you want any update, please contact our mail:
                  support@example.com
                </p>
              </Modal>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
