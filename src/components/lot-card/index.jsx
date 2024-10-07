/* eslint-disable react/prop-types */

import {
  Button,
  Card,
  Col,
  Image,
  message,
  Modal,
  Popconfirm,
  Row,
  Typography,
} from "antd";
import { useState } from "react";
import LotDetailPage from "../../pages/lot-detail-page";
import lotApi from "../../config/lotApi";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const LotCard = ({ lot, onLotDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleDelete = async () => {
    try {
      console.log(lot.lotId);
      await lotApi.delete(`lots/${lot.lotId}`);
      message.success("Deleted successfully!");
      onLotDelete(); // Gọi hàm onLotDelete để cập nhật lại danh sách
    } catch (error) {
      message.error("Failed to delete lot: " + error.message);
    }
  };
  return (
    <>
      <Card title={`${lot.koiFishDto.variety} #${lot.sku}`}>
        <Row gutter={[16, 16]}>
          {/* Image Placeholder */}
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div
              style={{ width: 80, height: 80, backgroundColor: "#B0B0B0" }}
            /> */}
            <Image
              src={
                lot.koiFishDto.koiMedia?.$values?.[0]?.filePath ||
                "default-placeholder.png"
              }
              width={80}
              height={80}
            />
          </Col>

          {/* Details Section */}
          <Col xs={16} sm={16} md={16} lg={16} xl={16}>
            <Text strong>Starting Price: </Text>
            <span>{lot.startingPrice || "..."}</span>
            <br />

            <Text strong>Varitey: </Text>
            <span>{lot.koiFishDto.variety || "..."}</span>
            <br />

            <Text strong>Method: </Text>
            <span>{lot.auctionMethod.auctionMethodName || "..."}</span>
            <br />

            <Text strong>By: </Text>
            <span>{lot.ownerName || "Unknown"}</span>
          </Col>

          {/* View Button */}
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={showModal}
            >
              Detail
            </Button>

            {/* Nút Delete với Popconfirm để xác nhận xóa */}
            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Col>
        </Row>
      </Card>
      {/* Modal hiển thị trang UpdateLotPage */}
      <Modal
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Bỏ footer để tùy chỉnh nút trong trang UpdateLotPage
        width={1200} // Đặt chiều rộng modal tùy ý
      >
        {/* Render trang UpdateLotPage */}
        <LotDetailPage lotData={lot} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};
export default LotCard;
