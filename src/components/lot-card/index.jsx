import { Button, Card, Col, Image, message, Modal, Popconfirm, Row, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LotDetailPage from '../../pages/lot-detail-page';
import lotApi from '../../config/lotApi';
import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import soldLotApi from '../../config/soldLotApi';
const { Text } = Typography;
import { DollarOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import userApi from '../../config/userApi';

const LotCard = ({ lotStatusId, lot, refetch }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [finalPrice, setFinalPrice] = useState(null);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const userRoleId = useSelector((store) => store.user.user?.UserRoleId);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [winnerId, setWinnerId] = useState(null);
  const handleLotCancel = () => {
    setIsCancelModalOpen(true);
    console.log("cancel", lot);
  }
  const handleLotDeliveryOpen = () => {
    setDeliveryModalVisible(true);
  }
  const handleLotDeliveryClose = () => {
    setDeliveryModalVisible(false);
  }
  const handleLotComplete = () => {
    handleComplete();
  }
  useEffect(() => {
    if (lotStatusId > 4) {
      const fetchSoldLot = async () => {
        try {
          const response = await soldLotApi.get(`${lot.lotId}`);
          setWinnerId(response?.data?.winnerId);
          setFinalPrice(response?.data?.finalPrice);
          console.log("response", response.data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchSoldLot();
    }
  }, [lot, lotStatusId]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel = async () => {
    try {
      await lotApi.put(`lots/${lot.lotId}/status`, {
        lotStatusName: "Canceled",
        description: cancelReason
      });
      message.success('Canceled successfully!');
      refetch();
    } catch (error) {
      message.error('Failed to cancel lot: ' + error.message);
    }
  }
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

  const handleComplete = async () => {
    try {
      await lotApi.put(`lots/${lot.lotId}/status`, {
        lotStatusName: "Completed"
      });
      message.success('Completed successfully!');
      refetch();
    } catch (error) {
      message.error('Failed to complete lot: ' + error.message);
    }
  }

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
          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
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
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            {lot?.lotStatusId > 5 && (
              <>
                <DollarOutlined style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '5px' }}>{finalPrice || "..."} VND</span>
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type="primary" shape="round" size="large" onClick={showModal}>
                Detail
              </Button>
              {userRoleId > 2 && finalPrice && lot?.lotStatusId == 6 && (
                <>
                  <Button type="primary" shape="round" size="large" onClick={handleLotDeliveryOpen}>
                    Delivery
                  </Button>
                  <Button type="primary" shape="round" size="large" onClick={handleLotCancel} danger>
                    Cancel
                  </Button>
                </>
              )}
              {userRoleId > 2 && finalPrice && lot?.lotStatusId == 7 && (
                <>
                  <Button type="primary" shape="round" size="large" onClick={handleLotComplete}>
                    Complete
                  </Button>
                  <Button type="primary" shape="round" size="large" onClick={handleLotCancel} danger>
                    Cancel
                  </Button>
                </>
              )}
            </div>

            {/* Nút Delete với Popconfirm để xác nhận xóa */}
            {userRoleId === 2 && lot?.lotStatusId < 3 && (
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
      <Modal
        open={deliveryModalVisible}
        onCancel={handleLotDeliveryClose}
        footer={null}
        width={1200}
        style={{ top: 0 }}
      >
        <DeliveryModal lotInfoData={lot} refresh={refetch} winnerId={winnerId} />
      </Modal>
      <Modal
        title="Cancel Lot"
        open={isCancelModalOpen}
        onCancel={() => {
          setIsCancelModalOpen(false);
        }}
        onOk={handleCancel}
      >
        <TextArea
          placeholder="Reason"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </>
  );
};
const DeliveryModal = ({ lotInfoData, refresh, winnerId }) => {
  const mockData = {
    "UserId": winnerId,
    "phone": "0784904003",
    "firstName": "Thang",
    "lastName": "Tran",
    "ProvinceCode": null,
    "DistrictCode": null,
    "WardCode": null,
    "address": "123 Main St, Anytown, USA"
  }
  const [loading, setLoading] = useState(true);

  const [winnerInfoData, setWinnerInfoData] = useState(null);
  useEffect(() => {
    const fetchWinnerInfoData = async () => {
      const response = await userApi.get(`manage/profile/${winnerId}`);
      console.log("winnerInfoData", response.data);
      if (response) {
        setWinnerInfoData(response.data);
        setLoading(false);
      }
    }
    fetchWinnerInfoData();
    setLoading(false);
    // setWinnerInfoData(mockData);
  }, [lotInfoData]);

  const tableDataSource = [
    { key: 'name', label: 'Name', value: winnerInfoData?.FirstName + " " + winnerInfoData?.LastName || 'N/A' },
    { key: 'phone', label: 'Contact Number', value: winnerInfoData?.Phone || 'N/A' },
    { key: 'address', label: 'Delivery Address', value: winnerInfoData?.Address || 'N/A' },
  ];

  const handleApprove = async () => {
    try {
      const response = await lotApi.put(`lots/${lotInfoData.lotId}/status`, {
        lotStatusName: "To Receive"
      });
      message.success('Delivery approved');
      refresh();
      // handleLotDeliveryClose();
    } catch (error) {
      message.error(error.message);
    }
  };

  return loading ? (
    <Spin />
  ) : (
    <div className="delivery-modal">
      <h2>Delivery Information</h2>
      <Table
        dataSource={tableDataSource}
        columns={[
          {
            title: 'Property',
            dataIndex: 'label',
            key: 'label',
            width: '40%',
            render: (text) => <Text strong>{text}</Text>
          },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
          }
        ]}
        pagination={false}
        size="middle"
        bordered
      />
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={handleApprove}
        >
          Approve
        </Button>
      </div>
    </div>
  );
};


export default LotCard;
