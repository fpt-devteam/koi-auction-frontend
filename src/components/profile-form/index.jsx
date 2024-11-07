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
  Image,
  Spin,
} from "antd";
import { useForm } from "antd/es/form/Form";
import addressApi from "../../config/addressApi";
import userApi from "../../config/userApi";
import "./index.css";

const { Option } = Select;
const DATE_FORMAT = "YYYY-MM-DD",
  TIME_FORMAT = "HH:mm";
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
      <div className="image-input">
        <Image
          className="image-avatar"
          alt="Avatar"
          width={300}
          height={300}
          preview={false}
          src={imageExample}
        />
        <br />
      </div>
      <Card
        size="small"
        className="card"
        bordered={false}
        style={{ width: 700 }}
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
                <Input 
                  placeholder="example@gmail.com" 
                  disabled={!isEditing}
                />
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
                <Input 
                  placeholder="+84 - 345 678 910" 
                  disabled={!isEditing}
                />
              </Form.Item>
            </Col>
          </Row>

          {isBreeder && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Certificate" name="Certificate">
                  <Input 
                    placeholder="Enter your Certificate information" 
                    disabled={!isEditing}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="About" name="About">
                  <Input.TextArea 
                    placeholder="Enter information about your farm" 
                    disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Province" name="ProvinceCode">
                <Select
                  placeholder="Select province"
                  onChange={handleSelectProvince}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                <Select placeholder="Select ward" disabled={!isEditing}>
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
            <Col span={24} style={{ textAlign: 'right' }}>
              {!isEditing ? (
                <Button type="primary" onClick={() => setIsEditing(true)}>
                  Update
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handleCancel} 
                    style={{ marginRight: 8 }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
