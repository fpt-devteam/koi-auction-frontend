import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Input, Select, Button, message, Image, Upload, Spin, } from "antd";
import { useForm } from "antd/es/form/Form";
import uploadToFirebase from "../../utils/upload";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
import "./index.css"
import axios from "axios";
import vnAdressApi from "../../config/vnAdressApi";
const imageExample = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
                    { id: 1003, name: "Vinh Phuc" }
                ]
            },
            {
                id: 102,
                name: "Hoan Kiem",
                wards: [
                    { id: 1004, name: "Hang Buom" },
                    { id: 1005, name: "Hang Dao" },
                    { id: 1006, name: "Dong Xuan" }
                ]
            }
        ]
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
                    { id: 2003, name: "Da Kao" }
                ]
            },
            {
                id: 202,
                name: "District 2",
                wards: [
                    { id: 2004, name: "Thao Dien" },
                    { id: 2005, name: "An Phu" },
                    { id: 2006, name: "Binh An" }
                ]
            }
        ]
    }
];
const MAX_IMAGE_SIZE_MB = 5; // 5MB 

export default function GeneralInfoForm({ user, refresh, showOnly = false }) {
    const [formVariable] = useForm();
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [avatarUrl, setAvatarUrl] = useState(imageExample);
    const [loading, setLoading] = useState(true);
    const [provinceId, setProvinceId] = useState(null);
    const [districtId, setDistrictId] = useState(null);
    const [wardId, setWardId] = useState(null);
    // Mock user data
    user = {
        ...user,
        provinceId: 92,
        districtId: 925,
        wardId: 31261,
    }
    const onFinish = (values) => {
        console.log(values);
        message.success("Form submitted successfully!");
    };

    useEffect(() => {
        const getProvince = async () => {
            try {
                const provinceSource = await axios.get("https://vapi.vnappmob.com/api/province/");
                const provinces = provinceSource.data.results;
                setProvinceList(provinces);
                console.log(provinces)
            } catch (error) {
                console.error("Error fetching provinces:", error);
                message.error("Failed to load provinces");
            }
        };
        getProvince();
        setLoading(false);
    }, []);

    useEffect(() => {
        const initializeAddressData = async () => {
            if (user) {
                if (user.provinceId) {
                    setProvinceId(user.provinceId);
                    if (user.districtId) {
                        setDistrictId(user.districtId);
                        if (user.wardId) {
                            setWardId(user.wardId);
                        }
                    }
                }
                // Set basic user info
                formVariable.setFieldsValue({
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    email: user.Email,
                    phone: user.Phone,
                });


            }
        };

        initializeAddressData();
    }, [user, formVariable]);

    useEffect(() => {
        const getDistrict = async () => {
            try {
                const districtSource = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
                const districts = districtSource.data.results;
                setDistrictList(districts);
                console.log(districts)
            } catch (error) {
                console.error("Error fetching districts:", error);
                message.error("Failed to load districts");
            }
        };
        if (provinceId) {
            getDistrict();
        }
        console.log(districtList)
    }, [provinceId])
    useEffect(() => {
        const getWard = async () => {
            try {
                const wardSource = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
                const wards = wardSource.data.results;
                setWardList(wards);
                console.log(wards)
            } catch (error) {
                console.error("Error fetching wards:", error);
                message.error("Failed to load wards");
            }
        };
        if (districtId) {
            getWard();
        }
        console.log(wardList)
    }, [districtId])
    const handleSubmit = (values) => {
        console.log("Submitting form with values:", values);
        // Add your API call here
        // formVariable.submit();
    };

    const handleSelectProvince = (value) => {
        formVariable.setFieldsValue({ district: undefined, ward: undefined });
        setProvinceId(value);
    };

    const handleSelectDistrict = (value) => {
        setDistrictId(value);
        formVariable.setFieldsValue({ ward: undefined });
    };
    // const handleBeforeUploadImage = (file) => {
    //     if (!file.type.startsWith("image/")) {
    //         message.error("You can only upload image files!");
    //         return false;
    //     }
    //     if (file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
    //         message.error(`Image size must be smaller than ${MAX_IMAGE_SIZE_MB}MB!`);
    //         return false;
    //     }
    //     return false;
    // }
    // const handleChangeAvatar = async (file) => {
    //     const updatedAvatar = await Promise.all(
    //         file.map(async (file) => {
    //             if (file.originFileObj) {
    //                 // Upload file từ local lên Firebase
    //                 const firebaseUrl = await uploadToFirebase(file.originFileObj);
    //                 return {
    //                     filePath: firebaseUrl, // Lưu lại URL từ Firebase sau khi upload
    //                 };
    //             }
    //             return {
    //                 filePath: file.url, // Giữ nguyên file đã có sẵn từ Firebase
    //             }; // Giữ nguyên file đã có sẵn từ Firebase
    //         })
    //     );
    //     setAvatarUrl(updatedAvatar[0].filePath);
    // };

    return loading ? <Spin /> : (
        <>
            <div className="image-input">
                <Image
                    className="image-avatar"
                    alt="Cyber Kitty"
                    width={300}
                    height={300}
                    src={avatarUrl}
                />
                <br />
                <br />
                {/* <Upload
                    beforeUpload={handleBeforeUploadImage}
                    listType="picture"
                    onChange={handleChangeAvatar}
                    showUploadList={{ showRemoveIcon: !showOnly }}
                >
                    {!showOnly && (
                        <>
                            <Button type="primary" icon={<UploadOutlined />}>
                                Change Avatar
                            </Button>
                        </>
                    )}
                </Upload> */}
            </div>
            <Card
                size="small"
                className="card"
                bordered={false}
                style={{ width: 700 }}
            >

                <Form form={formVariable} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                className="form-item"
                                label="First Name"
                                name="firstName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your first name"
                                    }
                                ]}
                            >
                                <Input placeholder="Enter your first name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="form-item"
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your last name"
                                    }
                                ]}
                            >
                                <Input placeholder="Enter your last name" />
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                className="form-item"
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                        message: "Please enter a valid email"
                                    }
                                ]}
                            >
                                <Input placeholder="example@gmail.com" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="form-item"
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your phone number"
                                    }
                                ]}
                            >
                                <Input placeholder="+84 - 345 678 910" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your address"
                                    }
                                ]}
                            >
                                <Input placeholder="Enter your home address" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Ward"
                                name="ward"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please choose your ward"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Select ward"
                                >
                                    {wardList.map(ward => (
                                        <Option key={ward.ward_name} value={ward.ward_name}>
                                            {ward.ward_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="District"
                                name="district"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your district"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Select district"
                                    onChange={handleSelectDistrict}
                                >
                                    {districtList.map(district => (
                                        <Option key={district.district_name} value={district.district_name}>
                                            {district.district_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Province"
                                name="province"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your province"
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Select province"
                                    onChange={handleSelectProvince}
                                >
                                    {provinceList.map(province => (
                                        <Option key={province.province_name} value={province.province_name}>
                                            {province.province_name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="primary" htmlType="submit">
                                Save All
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" onClick={refresh} >
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card >
        </>
    );
}
