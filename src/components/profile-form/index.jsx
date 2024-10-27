import React, { useEffect, useState } from "react";
import { Col, Row, Card, Form, Input, Select, Button, message, DatePicker, Image } from "antd";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;
import "./index.css"
const DATE_FORMAT = "YYYY-MM-DD", TIME_FORMAT = "HH:mm";
export default function GeneralInfoForm({ user, refresh }) {
    const [formVariable] = useForm();
    const [provinceList, setProvinceList] = useState([]);
    const onFinish = (values) => {
        message.success("Form submitted successfully!");
        console.log(values);
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
    const handleSubmit = () => {
        console.log("Submit")
    };
    return (
        <>
            <div className="image-input">
                <Image
                    className="image-avatar"
                    alt="Cyber Kitty"
                    width={300}
                    height={300}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <br />
                <br />
                <Button type="primary">Change</Button>
            </div>

            <Card
                size="small"
                className="card"
                bordered={false}
                style={{ width: 700 }}
            >

                <Form form={formVariable} layout="vertical" onFinish={onFinish}>
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
                                <Input placeholder="+84-345 678 910" />
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
                                <Input placeholder="Enter your ward" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your city"
                                    }
                                ]}
                            >
                                <Input placeholder="Enter your city" />
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
                                <Input placeholder="Enter your province" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type="primary" onClick={handleSubmit} >
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
