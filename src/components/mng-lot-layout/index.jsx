import { Row, Col, Button, Form, message } from "antd";
import LotInfo from "../lot-info";
import UploadKoiMedia from "../upload-koi-media";
import { useState } from "react";

const LotLayout = ({
  title,
  uploadKoiMediaData,
  lotInfoData,
  onCreate,
  onUpdate,
  onApprove,
  onReject,
}) => {
  const [form] = Form.useForm(); // Khởi tạo form
  const [action, setAction] = useState(""); // Trạng thái để lưu hành động hiện tại (Create, Update)

  // Hàm xử lý khi submit form
  const handleSubmit = async (values) => {
    if (action === "create") {
      await onCreate(values); // Gọi hàm onCreate với giá trị của form
    } else if (action === "update") {
      await onUpdate(values); // Gọi hàm onUpdate với giá trị của form
    }
  };

  const handleCreate = () => {
    setAction("create");
    form.submit(); // Submit form
  };

  const handleUpdate = () => {
    setAction("update");
    form.submit(); // Submit form
  };

  const handleApprove = async () => {
    await onApprove();
  };

  const handleReject = async () => {
    await onReject();
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "24px",
              }}
            >
              {/* <Button type="primary" htmlType="submit">
                Save
              </Button> */}
              <Button color="primary" variant="solid" onClick={handleCreate}>
                Create
              </Button>

              <Button color="primary" variant="solid" onClick={handleUpdate}>
                Update
              </Button>

              <Button color="primary" variant="solid" onClick={handleApprove}>
                Approve
              </Button>

              <Button color="danger" variant="solid" onClick={handleReject}>
                Reject
              </Button>
            </div>
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
