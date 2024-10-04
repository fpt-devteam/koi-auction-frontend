/* eslint-disable react/prop-types */
import { Row, Col, Button, Form } from "antd";
import LotInfo from "../lot-info";
import UploadKoiMedia from "../upload-koi-media";

const LotLayout = ({
  title,
  uploadKoiMediaData,
  lotInfoData,
  onSave,
  onCancel,
  //   isView,
}) => {
  const [form] = Form.useForm(); // Khởi tạo form

  // Hàm xử lý khi submit form
  const handleSubmit = (values) => {
    onSave(values); // Gọi hàm onSave với giá trị của form
  };

  return (
    <div
      style={{
        maxWidth: "1500px",
        margin: "auto",
        padding: "24px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      {/* Form Ant Design */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit} // Xử lý khi submit form
        initialValues={{
          koiMedia: uploadKoiMediaData,
        }}
      >
        <Row gutter={[24, 24]}>
          {/* Info Section */}
          <Col span={16}>
            <h2 style={{ fontWeight: "bold" }}>{title}</h2>

            {/* Render lotInfo vào bên trong form */}
            <LotInfo initData={lotInfoData} showLotStatus={false} form={form} />

            {/* Save and Cancel*/}
            {/* {!isView && ( */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
              }}
            >
              <Button danger onClick={onCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
            {/* )} */}
          </Col>
          {/* Upload Section */}
          <Col span={8}>
            <UploadKoiMedia initData={uploadKoiMediaData} form={form} />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default LotLayout;
