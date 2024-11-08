import { Button, Card, Col, Image, message, Modal, Popconfirm, Row, Typography } from 'antd';
import { useState } from 'react';
import LotDetailPage from '../../pages/lot-detail-page';
import lotApi from '../../config/lotApi';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const LotCard = ({ lot, refetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userRoleId = useSelector((store) => store.user.user?.UserRoleId);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handleLotDelete = async () => {
    try {
      await lotApi.delete(`lots/${lot.lotId}`);
      message.success('Deleted successfully!');
      refetch();
    } catch (error) {
      message.error('Failed to delete lot: ' + error.message);
    }
  };
  const statusId = useSelector((state) => state.status.statusId);

  return (
    <>
      <Card
        style={{
          //shadow
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          //background color
          backgroundColor: '#fafafa'
        }}
        title={<div style={{ textAlign: 'left' }}>{`${lot.koiFishDto.variety} #${lot.sku}`}</div>}
      >
        <Row gutter={[16, 16]}>
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image src={lot.koiFishDto.koiMedia?.[0]?.filePath || 'default-placeholder.png'} width={80} height={80} />
          </Col>

          {/* Details Section */}
          <Col xs={16} sm={16} md={16} lg={16} xl={16}>
            <Text strong>Starting Price: </Text>
            <span>{lot.startingPrice || '...'}</span>
            <br />

            <Text strong>Varitey: </Text>
            <span>{lot.koiFishDto.variety || '...'}</span>
            <br />

            <Text strong>Method: </Text>
            <span>{lot.auctionMethod.auctionMethodName || '...'}</span>
            <br />

            {userRoleId > 2 && (
              <>
                <Text strong>By: </Text>
                <span>{lot.breederDetailDto?.farmName || 'Unknown'}</span>
                <br />
              </>
            )}
          </Col>

          {/* View Button */}
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <Button type="primary" shape="round" size="large" onClick={showModal}>
              Detail
            </Button>

            {/* Nút Delete với Popconfirm để xác nhận xóa */}
            {userRoleId === 2 && statusId < 3 && (
              <Popconfirm title="Are you sure to delete this item?" onConfirm={handleLotDelete} okText="Yes" cancelText="No">
                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
              </Popconfirm>
            )}
          </Col>
        </Row>
      </Card>
      {/* Modal hiển thị trang UpdateLotPage */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null} // Bỏ footer để tùy chỉnh nút trong trang UpdateLotPage
        width={1200} // Đặt chiều rộng modal tùy ý
      >
        {/* Render trang UpdateLotPage */}
        <LotDetailPage lotData={lot} refetch={refetch} handleModalCancel={handleModalCancel} />
      </Modal>
    </>
  );
};
export default LotCard;
