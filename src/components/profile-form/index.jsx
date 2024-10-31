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
import { useForm } from "antd/es/form/Form";
import uploadToFirebase from "../../utils/upload";
import { UploadOutlined } from "@ant-design/icons";
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

  const handleSelectProvince = (value) => {
    const selectedProvince = provinceList.find(
      (province) => province.id === value
    );
    setCityList(selectedProvince.cities);
    setWardList([]);
    formVariable.setFieldsValue({ city: undefined, ward: undefined });
  };

  const handleSelectCity = (value) => {
    const selectedCity = cityList.find((city) => city.id === value);
    setWardList(selectedCity.wards);
    formVariable.setFieldsValue({ ward: undefined });
  };
  const handleChangeAvatar = (file) => {
    // Check if file exists and is an image
    if (!file) return;
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return;
    }
    // Check file size (limit to 5MB)
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return;
    }

    // Create FormData for API upload
    const formData = new FormData();
    formData.append("avatar", file);

    // Here you would typically make an API call to upload the image
    // For now, we'll just create a temporary URL to display the image
    const imageUrl = URL.createObjectURL(file);
    setAvatarUrl(imageUrl);

    // Example API call (uncomment and modify as needed):
    /*
        try {
            const response = await fetch('your-api-endpoint/upload-avatar', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setAvatarUrl(data.imageUrl);
                message.success('Avatar uploaded successfully!');
            }
        } catch (error) {
            message.error('Failed to upload avatar');
            console.error('Upload error:', error);
        }
        */
  };

  return (
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
        <Button
          type="primary"
          onClick={() => {
            handleChangeAvatar();
          }}
        >
          Change
        </Button>
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
                    message: "Please enter your first name",
                  },
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
                    message: "Please enter your last name",
                  },
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
                    message: "Please enter a valid email",
                  },
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
                    message: "Please enter your phone number",
                  },
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
                    message: "Please enter your address",
                  },
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
                    message: "Please choose your ward",
                  },
                ]}
              >
                <Select placeholder="Select ward" disabled={!wardList.length}>
                  {wardList.map((ward) => (
                    <Option key={ward.id} value={ward.id}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please enter your city",
                  },
                ]}
              >
                <Select placeholder="Select city" onChange={handleSelectCity}>
                  {cityList.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.name}
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
                    message: "Please enter your province",
                  },
                ]}
              >
                <Select
                  placeholder="Select province"
                  onChange={handleSelectProvince}
                >
                  {provinceList.map((province) => (
                    <Option key={province.id} value={province.id}>
                      {province.name}
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
