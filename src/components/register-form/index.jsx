import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  message,
  Select,
  Row,
  Col,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./index.scss"; // Custom CSS for styling
import userApi from "../../config/userApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import addressApi from "../../config/addressApi";
import UploadAvatar from "../upload-avatar";
import emailApi from "../../config/emailApi";

const RegisterForm = ({ isBreeder }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [provinceId, setProvinceId] = useState(null);
  const [districtId, setDistrictId] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await addressApi.get("/province");
        setProvinceList(response.data);
      } catch (error) {
        // //console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);
  useEffect(() => {
    if (provinceId) {
      fetchDistricts();
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWards();
    }
  }, [districtId]);

  const fetchDistricts = async () => {
    try {
      const response = await addressApi.get(`/district/${provinceId}`);
      setDistrictList(response.data);
    } catch (error) {
      // //console.error("Error fetching districts:", error);
    }
  };
  const fetchWards = async () => {
    try {
      const response = await addressApi.get(`/ward/${districtId}`);
      setWardList(response.data);
    } catch (error) {
      // //console.error("Error fetching Wards:", error);
    }
  };

  const handleProvinceChange = async (value) => {
    setProvinceId(value);
    setWardList([]);
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = async (value) => {
    setDistrictId(value);
    form.setFieldsValue({ ward: undefined });
  };

  const handleRegister = async (values) => {
    setLoading(true);
    const formValues = {
      FirstName: values.firstName,
      LastName: values.lastName,
      Username: values.username,
      Phone: values.phone,
      Email: values.email,
      Password: values.password,
      EmailToken: values.code,
      Address: values.address,
      ProvinceCode: values.provinceCode,
      DistrictCode: values.districtCode,
      WardCode: values.wardCode,
    };

    if (isBreeder) {
      formValues.IsBreeder = true;
      formValues.FarmName = values.farmName;
      formValues.Certificate = values.Certificate;
      formValues.About = values.About;
    }

    try {
      const response = await userApi.post("/register", formValues);
      const email = values.email;
      setLoading(false);
      if (response.status >= 200 && response.status < 300) {
        if (isBreeder) {
          message.success(
            "Register successful! Please wait for admin approval."
          );
          sendMail(email);
          setTimeout(() => {
            navigate("/success-register");
          }, 1000);
        } else {
          message.success("Registration successful! Please log in.");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      }
    } catch (error) {
      if (error.response) {
        setLoading(false);
        message.error(
          error.response.data.message || "Register failed. Please try again."
        );
      }
    }
  };
  const sendMail = async (email) => {
    try {
      const response = await emailApi.post("/send-email", {
        Email: email,
        Subject: "Thank you for registering to become our Breeders!",
        Text: "Please wait for our admin to verify your farm for 1 to 7 days. <br /> We will send you an email notification once your farm is verified.",
      });
      // //console.log(response.data);
      message.success(response.data.message);
    } catch (error) {
      if (error.response) {
        message.error(
          error.response.data.message || "Send Email failed. Please try again."
        );
      }
    }
  };

  const handleVerification = async () => {
    try {
      const email = form.getFieldValue("email");
      if (!email) {
        message.error("Please input your email!");
        return;
      }
      const response = await userApi.post("/verify-email", {
        Email: email,
      });
      // //console.log(response.data);
      message.success(response.data.message);
    } catch (error) {
      if (error.response) {
        message.error(
          error.response.data.message ||
          "Verification failed. Please try again."
        );
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    // //console.log("Failed:", errorInfo);
  };

  return (
    // <div className="register-form-container">
    <Card
      className="res-card"
      title={
        <p className="register-form-title">
          {" "}
          {isBreeder ? "Farm Request Form" : "Register"}
        </p>
      }
      bordered={false}
      style={{
        width: 600,
        maxWidth: 700,
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        name="register"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {isBreeder && (
          <>
            <Form.Item
              style={{ display: "inline" }}
              label="Avatar"
              name="Certificate"
              rules={[{ required: true, message: "Please upload an avatar!" }]}
            >
              <UploadAvatar />
            </Form.Item>
            <Form.Item
              className="form-item"
              label="Farm Name"
              name="farmName"
              rules={[
                { required: true, message: "Please input your farm name!" },
              ]}
            >
              <Input className="res-input" placeholder="Enter your farm name" />
            </Form.Item>
          </>
        )}
        {/* First Name */}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              className="form-item"
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                className="res-input"
                placeholder="Enter your first name"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Last Name */}
            <Form.Item
              className="form-item"
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input className="res-input" placeholder="Enter your last name" />
            </Form.Item>
          </Col>
        </Row>
        {/* Username */}
        <Form.Item
          className="form-item"
          label="Account"
          name="username"
          rules={[
            { required: true, message: "Please input your username!" },
            { min: 3, message: "Username must be at least 3 characters" },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message:
                "Username can only contain letters, numbers and underscore",
            },
          ]}
        >
          <Input
            className="res-input"
            prefix={<UserOutlined />}
            placeholder="Enter your username"
          />
        </Form.Item>
        {/* Phone */}
        <Form.Item
          className="form-item"
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            { pattern: /^[0-9]+$/, message: "Phone number must be numeric!" },
            { len: 10, message: "Phone number must be exactly 10 digits!" },
          ]}
        >
          <Input
            className="res-input"
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number"
          />
        </Form.Item>
        <Form.Item label="Address" name="address" required>
          <Input placeholder="Enter your home address" />
        </Form.Item>

        {/* Address */}
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              className="form-item"
              label="Province"
              name="provinceCode"
              required
            >
              <Select
                placeholder="Select province"
                onChange={handleProvinceChange}
                options={provinceList?.map((province) => ({
                  label: province.name,
                  value: province.code,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="form-item"
              label="District"
              name="districtCode"
              required
            >
              <Select
                placeholder="Select district"
                onChange={handleDistrictChange}
                options={districtList?.map((district) => ({
                  label: district.name,
                  value: district.code,
                }))}
              >
                {/* {districtList?.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))} */}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              className="form-item"
              label="Ward"
              name="wardCode"
              required
            >
              <Select
                placeholder="Select ward"
                options={wardList?.map((ward) => ({
                  label: ward.name,
                  value: ward.code,
                }))}
              >
                {/* {wardList?.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))} */}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* About Farm */}
        {isBreeder && (
          <Form.Item
            label="About Farm"
            name="About"
            rules={[
              { message: "Please input your farm introduction!" },
              { required: true },
            ]}
          >
            <Input.TextArea size="small" />
          </Form.Item>
        )}

        {/* Email */}
        <Form.Item
          className="form-item"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            { type: "email", message: "The input is not a valid E-mail!" },
          ]}
        >
          <div className="email-form">
            <Input
              className="email-input"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
            <Button className="send-verify-btn" onClick={handleVerification}>
              Send Verification
            </Button>
          </div>
        </Form.Item>
        {/* Verify Code */}
        <Form.Item
          className="form-item"
          label="Verification Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your verify code!",
            },
            {
              pattern: /^[0-9]{6}$/,
              message: "Verification code must be exactly 6 digits!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          className="form-item"
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters" },
            {
              pattern: /^(?=.*[!@#$%^&*(),.?":{}|<>])[^\s]*$/,
              message:
                "Password must contain at least one special character, and must not include spaces.",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            className="res-input"
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>
        {/* Confirm Password */}
        <Form.Item
          className="form-item"
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="res-input"
            prefix={<LockOutlined />}
            placeholder="Confirm your password"
          />
        </Form.Item>
        {/* Checkbox */}
        <Form.Item
          className="form-item"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                    new Error("You must agree to our terms and policy!")
                  ),
            },
          ]}
        >
          <Checkbox>I agreed with company policies and terms.</Checkbox>
        </Form.Item>
        {/* Submit Button */}
        <Form.Item className="form-item">
          <Button
            className="res-btn"
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Create an account
          </Button>
        </Form.Item>
        <p style={{ textAlign: "center" }}>
          Already have an account? <a href="/login">Log in</a>.
        </p>
      </Form>
    </Card>
    // </div>
  );
};

export default RegisterForm;
