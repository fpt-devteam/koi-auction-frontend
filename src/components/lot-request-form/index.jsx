/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Row,
  Col,
  InputNumber,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Option } = Select;

// Component Upload
const UploadComponent = ({ koiMedia, setKoiMedia }) => {
  const props = {
    beforeUpload: (file) => {
      setKoiMedia([...koiMedia, file]);
      return false;
    },
    onRemove: (file) => {
      setKoiMedia(koiMedia.filter((f) => f !== file));
    },
    koiMedia,
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <Upload.Dragger {...props} multiple={false}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Upload 1 Photo + 1 Video</p>
      </Upload.Dragger>

      {/* Hiển thị danh sách file đã upload */}
      {koiMedia.map((file) => (
        <div
          key={file.koiMediaId || file.name} // Nếu koiMediaId không tồn tại, sử dụng file name
          style={{ marginTop: "12px", display: "flex", alignItems: "center" }}
        >
          <img
            src={
              file.filePath &&
              file.filePath.startsWith("https://firebasestorage.googleapis.com")
                ? file.filePath // Nếu là đường dẫn Firebase, sử dụng trực tiếp
                : URL.createObjectURL(file) // Nếu không, sử dụng URL.createObjectURL()
            }
            alt={file.filePath}
            style={{ width: "50px", height: "50px", marginRight: "12px" }}
          />
          <Button
            type="text"
            danger
            onClick={() => props.onRemove(file)}
            style={{ marginLeft: "auto" }}
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};

const LotInfoComponent = ({ lot }) => {
  // Kiểm tra nếu lot là null, thì gán các giá trị mặc định
  const defaultLot = lot || {
    startingPrice: 0,
    createdAt: "N/A",
    koiFishDto: {
      variety: "",
      sex: false,
      sizeCm: 0,
      yearOfBirth: 2000,
      koiMedia: [],
    },
    lotStatusDto: {
      lotStatusName: "Unknown",
    },
  };

  const [koiMedia, setKoiMedia] = useState(
    defaultLot.koiFishDto.koiMedia || []
  );

  const onFinish = (values) => {
    console.log("Form Values:", values);
    console.log("Updated Media:", koiMedia);
    message.success("Form Submitted Successfully!");
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        startingPrice: defaultLot.startingPrice,
        variety: defaultLot.koiFishDto.variety,
        sex: defaultLot.koiFishDto.sex ? "male" : "female",
        sizeCm: defaultLot.koiFishDto.sizeCm,
        yearOfBirth: defaultLot.koiFishDto.yearOfBirth,
        lotStatusName: defaultLot.lotStatusDto.lotStatusName,
      }}
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Upload Section */}
        <Col span={8}>
          <UploadComponent koiMedia={koiMedia} setKoiMedia={setKoiMedia} />
        </Col>

        {/* Form Fields Section */}
        <Col span={16}>
          <h2 style={{ fontWeight: "bold" }}>Edit Lot</h2>
          <p style={{ marginBottom: "24px", color: "#888" }}>
            Created at {defaultLot.createdAt}
          </p>

          <Form.Item
            label="Starting Price"
            name="startingPrice"
            rules={[
              { required: true, message: "Please enter the starting price" },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Variety"
            name="variety"
            rules={[{ required: true, message: "Please enter the variety" }]}
          >
            <Input placeholder="Enter variety" />
          </Form.Item>

          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Size (cm)"
                name="sizeCm"
                rules={[{ required: true, message: "Please enter size" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Year of Birth"
                name="yearOfBirth"
                rules={[
                  { required: true, message: "Please enter year of birth" },
                ]}
              >
                <InputNumber
                  min={1900}
                  max={new Date().getFullYear()}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Sex"
            name="sex"
            rules={[{ required: true, message: "Please select the sex" }]}
          >
            <Select placeholder="Select sex">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Lot Status" name="lotStatusName">
            <Input disabled />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <Button danger>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

// Example of using EditLotForm
const lotData = {
  lotId: 9,
  startingPrice: 200,
  createdAt: "2024-09-26T08:45:00.1",
  koiFishDto: {
    variety: "stridsfdfdsang",
    sex: true,
    sizeCm: 2,
    yearOfBirth: 2000,
    koiMedia: [
      {
        koiMediaId: 1,
        filePath:
          "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/Screenshot%202023-12-20%20140603.png?alt=media&token=7263066c-aa15-4f00-bae1-aa8bbc5d183a",
        isPrimary: false,
      },
      {
        koiMediaId: 2,
        filePath:
          "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/Screenshot%202023-12-20%20140829.png?alt=media&token=7ad4831c-73cf-49b8-9beb-363cce6abe3b",
        isPrimary: false,
      },
    ],
  },
  lotStatusDto: {
    lotStatusId: 1,
    lotStatusName: "Pending",
  },
};

const LotRequestForm = () => {
  return <LotInfoComponent />;
};

export default LotRequestForm;
