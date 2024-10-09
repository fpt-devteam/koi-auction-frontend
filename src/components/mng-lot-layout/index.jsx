import { Row, Col, Button, Form } from "antd";
import LotInfo from "../lot-info";
import UploadKoiMedia from "../upload-koi-media";
import { useState } from "react";
import { useSelector } from "react-redux";

const LotLayout = ({
  title,
  uploadKoiMediaData,
  lotInfoData,
  onCreate,
  onUpdate,
  onApprove,
  onReject,
  showLotStatus,
}) => {
  const [form] = Form.useForm(); // Khởi tạo form
  const [action, setAction] = useState(""); // Trạng thái để lưu hành động hiện tại (Create, Update)

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

  // const [isUserLoaded, setIsUserLoaded] = useState(false); // Biến trạng thái để kiểm tra việc khôi phục

  const userRoleId = useSelector((state) => state.user.user?.user?.userRoleId);
  const statusId = useSelector((state) => state.status.statusId);
  if (statusId === null || userRoleId === null) {
    return null;
  }
  // console.log("statusId", statusId);
  // console.log("userRoleId", userRoleId);
  // console.log("onUpdate", onUpdate);
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
          <Col span={14}>
            <h2 style={{ fontWeight: "bold" }}>{title}</h2>

            {/* Render lotInfo vào bên trong form */}
            <LotInfo
              initData={lotInfoData}
              showLotStatus={showLotStatus}
              form={form}
            />

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
              {onCreate != null && (
                <Button color="primary" variant="solid" onClick={handleCreate}>
                  Create
                </Button>
              )}

              {onUpdate != null && statusId == 1 && userRoleId == 2 && (
                <Button color="primary" variant="solid" onClick={handleUpdate}>
                  Update
                </Button>
              )}

              {onApprove != null && statusId == 1 && userRoleId > 2 && (
                <Button color="primary" variant="solid" onClick={handleApprove}>
                  Approve
                </Button>
              )}

              {onReject != null && statusId == 1 && userRoleId > 2 && (
                <Button color="danger" variant="solid" onClick={handleReject}>
                  Reject
                </Button>
              )}
            </div>
          </Col>
          {/* Upload Section */}
          <Col span={10}>
            <UploadKoiMedia
              initData={uploadKoiMediaData}
              form={form}
              showOnly={userRoleId > 2 || statusId > 1}
            ></UploadKoiMedia>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default LotLayout;
