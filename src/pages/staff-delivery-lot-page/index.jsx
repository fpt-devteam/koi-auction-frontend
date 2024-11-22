import React, { useState, useEffect } from "react";
import {
  Spin,
  message,
  Card,
  List,
  Button,
  Col,
  Row,
  Image,
  Typography,
  Modal,
  Table,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import lotApi from "../../config/lotApi";
import { useNavigate } from "react-router-dom";
import "./index.css";
import userApi from "../../config/userApi";
const { Text } = Typography;
const LOT_STATUS_ID = 6;
const LOT_STATUS_NAME = "To Ship";
export default function StaffOrderStatusPage() {
  const [loading, setLoading] = useState(true);
  const [seed, setSeed] = useState(1);
  const navigate = useNavigate();

  const handleReset = () => setSeed(Math.random());

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <Spin />
  ) : (
    <div className="order-status-container">
      <div className="header-section">
        <Button
          style={{ marginBottom: 20 }}
          type="primary"
          size="middle"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
      <OrderList
        key={seed}
        lotStatusId={LOT_STATUS_ID}
        lotStatusName={LOT_STATUS_NAME}
        refresh={handleReset}
      />
    </div>
  );
}

const OrderList = ({ lotStatusId, lotStatusName, refresh }) => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await lotApi.get("lots");
        if (response) {
          //console.log(response.data);
          const filteredData = response.data.filter(
            (lot) => lot.lotStatusDto.lotStatusId == lotStatusId
          );
          setOrderList(filteredData);
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [lotStatusId]);

  return loading ? (
    <Spin />
  ) : (
    <List
      itemLayout="vertical"
      dataSource={orderList}
      renderItem={(order) => (
        <List.Item>
          <LotCard lot={order} refetch={refresh} />
        </List.Item>
      )}
      locale={{ emptyText: `No ${lotStatusName} orders` }}
    />
  );
};

const LotCard = ({ lot }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const [isLotInfoModalVisible, setIsLotInfoModalVisible] = useState(false);
  const toggleLotInfoModal = () =>
    setIsLotInfoModalVisible(!isLotInfoModalVisible);
  return (
    <div className="lot-card-wrapper">
      <Card
        style={{
          border: "2px solid #d9d9d9",
        }}
        className="lot-card"
        title={
          <div className="lot-card-title">
            {`${lot.koiFishDto.variety} #${lot.sku}`}
          </div>
        }
      >
        <Row gutter={[16, 16]} align="flex-start">
          <Col span={4} className="image-col">
            <Image
              src={
                lot.koiFishDto.koiMedia?.[0]?.filePath ||
                "default-placeholder.png"
              }
              width={80}
              height={80}
              alt="Koi Fish"
            />
          </Col>
          <Col span={10}>
            <div className="lot-details">
              <div className="lot-detail-item">
                <Text strong>Variety: </Text>
                <span>{lot.koiFishDto.variety || "..."}</span>
              </div>
              <div className="lot-detail-item">
                <Text strong>By: </Text>
                <span>{lot.breederDetailDto?.farmName || "Unknown"}</span>
              </div>
              <div className="lot-detail-item">
                <Text strong>Method: </Text>
                <span>{lot.auctionMethod.auctionMethodName || "Unknown"}</span>
              </div>
            </div>
          </Col>
          <Col span={5}>
            <div className="lot-detail-item">
              <DollarOutlined />
              <span>{lot.finishPrice || "..."}</span>
            </div>
          </Col>
          <Col span={5}>
            <div className="lot-detail-item">
              <Button size="middle" type="primary" onClick={toggleLotInfoModal}>
                View
              </Button>
              <Button size="middle" type="primary" onClick={toggleLotInfoModal}>
                Delivery
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Modal
        open={isModalVisible}
        onCancel={toggleModal}
        footer={null}
        width={1200}
        style={{ top: 0 }}
      >
        <LotInfoModal
          lotInfoData={lot}
          uploadKoiMediaData={lot.koiFishDto.koiMedia || []}
        />
      </Modal>
      <Modal
        open={isLotInfoModalVisible}
        onCancel={toggleLotInfoModal}
        footer={null}
        width={1200}
        style={{ top: 0 }}
      >
        <DeliveryModal lotInfoData={lot} />
      </Modal>
    </div>
  );
};
const LotInfoModal = ({ lotInfoData }) => {
  const defaultImage = "default-placeholder.png";
  const koiImage =
    lotInfoData.koiFishDto.koiMedia?.[0]?.filePath || defaultImage;

  const tableDataSource = [
    { key: "sku", label: "SKU", value: lotInfoData.sku },
    { key: "variety", label: "Variety", value: lotInfoData.koiFishDto.variety },
    {
      key: "size",
      label: "Size",
      value: `${lotInfoData.koiFishDto.sizeCm} cm`,
    },
    {
      key: "yearOfBirth",
      label: "Year of Birth",
      value: `${lotInfoData.koiFishDto.yearOfBirth}`,
    },
    {
      key: "sex",
      label: "Sex",
      value: lotInfoData.koiFishDto.sex ? "Male" : "Female",
    },
    {
      key: "farm",
      label: "Farm",
      value: lotInfoData.breederDetailDto?.farmName,
    },
    {
      key: "method",
      label: "Auction Method",
      value: lotInfoData.auctionMethod.auctionMethodName,
    },
    {
      key: "status",
      label: "Status",
      value: lotInfoData.lotStatusDto.lotStatusName,
    },
  ];

  return (
    <div className="lot-info-modal">
      <Row gutter={[32, 32]}>
        <Col span={14}>
          <h2 className="lot-info-title">Lot Detail</h2>
          <br />
          <div className="lot-info-content">
            <div className="info-section">
              <Table
                dataSource={tableDataSource}
                columns={[
                  {
                    title: "Property",
                    dataIndex: "label",
                    key: "label",
                    width: "40%",
                    render: (text) => <Text strong>{text}</Text>,
                  },
                  {
                    title: "Value",
                    dataIndex: "value",
                    key: "value",
                  },
                ]}
                pagination={false}
                size="middle"
                bordered
              />
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className="image-container">
            <Image
              className="lot-image"
              src={koiImage}
              width="100%"
              alt="Koi Fish"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
const DeliveryModal = ({ lotInfoData }) => {
  const mockData = {
    UserId: 5,
    phone: "0784904003",
    firstName: "Thang",
    lastName: "Tran",
    ProvinceCode: null,
    DistrictCode: null,
    WardCode: null,
    address: "123 Main St, Anytown, USA",
  };
  // //console.log(lotInfoData);
  const [soldLotInfoData, setSoldLotInfoData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSoldLotInfoData = async () => {
      const response = await lotApi.get(`sold-lots/${lotInfoData.lotId}`);
      if (response) {
        setSoldLotInfoData(response.data);
        //console.log(response.data);
        setLoading(false);
      }
    };
    fetchSoldLotInfoData();
  }, [lotInfoData]);
  const [winnerInfoData, setWinnerInfoData] = useState(null);
  useEffect(() => {
    const fetchWinnerInfoData = async () => {
      //console.log("winnerId", soldLotInfoData.winnerId);
      // const response = await userApi.get(`manage/profile/${soldLotInfoData.winnerId}`);
      // if (response) {
      //     setWinnerInfoData(response.data);
      //     setLoading(false);
      // }
      setWinnerInfoData(mockData);
    };
    fetchWinnerInfoData();
  }, [soldLotInfoData]);

  const tableDataSource = [
    {
      key: "name",
      label: "Name",
      value:
        winnerInfoData?.firstName + " " + winnerInfoData?.lastName || "N/A",
    },
    {
      key: "phone",
      label: "Contact Number",
      value: winnerInfoData?.phone || "N/A",
    },
    {
      key: "address",
      label: "Delivery Address",
      value: winnerInfoData?.address || "N/A",
    },
    // { key: 'city', label: 'City', value: winnerInfoData?.city || 'N/A' },
  ];

  const handleApprove = async () => {
    try {
      const response = await lotApi.put(`lots/${lotInfoData.lotId}/status`, {
        lotStatusName: "To Receive",
      });
      if (response) {
        message.success("Delivery approved");
      }
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
            title: "Property",
            dataIndex: "label",
            key: "label",
            width: "40%",
            render: (text) => <Text strong>{text}</Text>,
          },
          {
            title: "Value",
            dataIndex: "value",
            key: "value",
          },
        ]}
        pagination={false}
        size="middle"
        bordered
      />
      <div style={{ marginTop: 20, textAlign: "right" }}>
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
