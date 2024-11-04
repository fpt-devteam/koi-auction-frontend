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
  DatePicker,
  Image,
  Dropdown,
} from "antd";
import { Col, Row, Card, Form, Input, Select, Button, message, Image, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import addressApi from "../../config/addressApi";
import userApi from "../../config/userApi";
import "./index.css";

const { Option } = Select;
import "./index.css";
const DATE_FORMAT = "YYYY-MM-DD",
  TIME_FORMAT = "HH:mm";
const imageExample =
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
const provinceData = [
  {
    id: 1,
    name: "Hanoi",
    cities: [
      {
        id: 101,
        name: "Ba Dinh",
        wards: [
          { id: 1001, name: "Phuc Xa" },
          { id: 1002, name: "Truc Bach" },
          { id: 1003, name: "Vinh Phuc" },
        ],
      },
      {
        id: 102,
        name: "Hoan Kiem",
        wards: [
          { id: 1004, name: "Hang Buom" },
          { id: 1005, name: "Hang Dao" },
          { id: 1006, name: "Dong Xuan" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ho Chi Minh City",
    cities: [
      {
        id: 201,
        name: "District 1",
        wards: [
          { id: 2001, name: "Ben Nghe" },
          { id: 2002, name: "Ben Thanh" },
          { id: 2003, name: "Da Kao" },
        ],
      },
      {
        id: 202,
        name: "District 2",
        wards: [
          { id: 2004, name: "Thao Dien" },
          { id: 2005, name: "An Phu" },
          { id: 2006, name: "Binh An" },
        ],
      },
    ],
  },
];
export default function GeneralInfoForm({ user, refresh }) {
  const [formVariable] = useForm();
  const [provinceList] = useState(provinceData); // Don't need to set this state
  const [cityList, setCityList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(imageExample);

  const onFinish = (values) => {
    message.success("Form submitted successfully!");
    console.log(values);
    handleSubmit(values);
  };

  //call Api get
  //
  useEffect(() => {
    if (user) {
      formVariable.setFieldsValue({
        firstName: user.FirstName,
        lastName: user.LastName,
        email: user.Email,
        phone: user.Phone,
        // ward: user.Ward,
        // city: user.City,
        // province: user.Province,
      });
    }
  }, [user, formVariable]);
  useEffect(() => {
    console.log(cityList);
  }, [cityList]);
  useEffect(() => {
    console.log(wardList);
  }, [wardList]);
  const handleSubmit = (values) => {
    console.log("Submitting form with values:", values);
    // Add your API call here
  };
const imageExample = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";

export default function GeneralInfoForm({ user, refresh }) {
    const [form] = useForm();
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [provinceId, setProvinceId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    useEffect(() => {
        if (user) {
            initializeFormData();
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
            form.validateFields(['DistrictCode']);
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
            const response = await userApi.patch(`update-profile`, values);
            console.log("Response:", response);
            refresh();
            message.success("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            message.error("Failed to submit form");
        }
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
            <Card size="small" className="card" bordered={false} style={{ width: 700 }}>
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="First Name"
                                name="FirstName"
                                rules={[{ required: true, message: "Please enter your first name" }]}
                            >
                                <Input placeholder="Enter your first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Last Name"
                                name="LastName"
                                rules={[{ required: true, message: "Please enter your last name" }]}
                            >
                                <Input placeholder="Enter your last name" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="Email"
                                rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                            >
                                <Input placeholder="example@gmail.com" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Phone"
                                name="Phone"
                                rules={[{ required: true, message: "Please enter your phone number" }]}
                            >
                                <Input placeholder="+84 - 345 678 910" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Address" name="Address">
                                <Input placeholder="Enter your home address" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Province" name="ProvinceCode">
                                <Select placeholder="Select province" onChange={handleSelectProvince}>
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
                                <Select placeholder="Select district" onChange={handleSelectDistrict}>
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

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="primary" onClick={handleSubmit}>
                                Save All
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" onClick={refresh}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}
