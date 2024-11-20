import {
  Button,
  Card,
  Col,
  Image,
  message,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import LotDetailPage from "../../pages/lot-detail-page";
import lotApi from "../../config/lotApi";
const { Text } = Typography;


const LotCard = ({ tabData, lot, refetch, userRoleId }) => {
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const handleClickDetailModal = () => setIsDetailModalVisible(!isDetailModalVisible);
  const handleLotDelete = async () => {
    try {
      await lotApi.delete(`lots/${lot.lotId}`);
      message.success("Deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to delete lot: " + error.message);
    }
  };

  return (
    <>
      <Card className="lot-card-wrapper"
        title={
          <div className="lot-card-title" >
            <span style={{ color: "#838181" }}>#{lot?.lotId} - </span>
            <span >{lot?.sku}</span>
          </div>
        }
        extra={
          <>
            <div className="status-badge">
              <Image
                width={24}
                height={24}
                preview={false}
                src={tabData.lotStatusIconLink}
              />
              <span className="status-text">{tabData.lotStatusName}</span>
            </div>

          </>
        }
        actions={[
          <div key="button-container" style={{
            display: "flex",
            justifyContent: "end",
            gap: "12px",
            marginRight: "32px"
          }}>
            <Button type="primary" size="large" key="view-lot" onClick={handleClickDetailModal}>Detail</Button>
            {userRoleId == 2 && tabData.lotStatusId < 3 && (
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={handleLotDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  size="large"
                  danger
                >
                  Delete
                </Button>

              </Popconfirm>
            )}
          </div>,
        ]}
      >
        <Row style={{ gap: "16px" }}>
          <Col span={3} style={{}}>
            <Image
              src={lot?.koiFishDto?.koiMedia?.[0].filePath}
              width={"100%"}
              height={"100%"}
              alt="Koi Fish"
              className="koi-image"
              preview={false}
            />
          </Col>
          <Col span={10} style={{}}>
            <div className="lot-details">
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title" >Variety: </Text>
                <Text className="lot-detail-item-content">{lot?.koiFishDto?.variety}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">By: </Text>
                <Text className="lot-detail-item-content">{lot?.breederDetailDto?.farmName}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">Farm Name: </Text>
                <Text className="lot-detail-item-content">{lot?.breederDetailDto?.farmName}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">Method: </Text>
                <Text className="lot-detail-item-content">{lot?.auctionMethod?.auctionMethodName}</Text>
              </div>
            </div>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
        <Modal
          open={isDetailModalVisible}
          onCancel={handleClickDetailModal}
          footer={null} // Bỏ footer để tùy chỉnh nút trong trang UpdateLotPage
          width={1200} // Đặt chiều rộng modal tùy ý
        >
          {/* Render trang UpdateLotPage */}
          <LotDetailPage
            lotData={lot}
            refetch={refetch}
            handleModalCancel={isDetailModalVisible}
          />
        </Modal>
      </Card>
    </>
  )
}

export default LotCard;
