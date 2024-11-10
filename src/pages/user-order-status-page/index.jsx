import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Col, Row, Image, Typography, Modal, Table, Popconfirm } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import lotApi from "../../config/lotApi";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";
import { useNavigate } from "react-router-dom";
import './index.css';
import paymentApi from "../../config/paymentApi";
const { Text } = Typography;
export default function UserOrderStatusPage() {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("6");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.user);
    const [auctionLotList, setAuctionLotList] = useState([]);
    const [soldLotList, setSoldLotList] = useState([]);
    // const fetchTabsData = async () => {
    //     if (tabsData.length === 0) {
    //         try {
    //             const response = await lotApi.get("lot-statuses");
    //             const data = response.data;
    //             setTabsData(data);
    //         } catch (error) {
    //             message.error(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // };

    useEffect(() => {
        if (user) {
            const staticTabsData = [
                { lotStatusId: 6, lotStatusName: "To Ship" },
                { lotStatusId: 7, lotStatusName: "To Receive" },
                { lotStatusId: 8, lotStatusName: "Completed" },
                { lotStatusId: 9, lotStatusName: "Canceled" },
            ];
            async function fetchLotData() {
                try {
                    await Promise.all([lotApi.get("auction-lots"), lotApi.get("sold-lots")])
                        .then(([auctionLotList, soldLotList]) => {
                            setAuctionLotList(auctionLotList.data);
                            setSoldLotList(soldLotList.data);
                            setLoading(false);
                        });

                } catch (error) {
                    message.error(error.message);
                }
            };
            fetchLotData();
            setTabsData(staticTabsData);
        }
    }, [user]);
    const handleTabChange = (key) => {
        setActiveTab(key);
        dispatch(setStatusId(key));
    };
    return loading ? (
        <Spin />
    ) : (
        <div className="order-status-container">
            <div className="header-section">
                <Button style={{ marginBottom: 20 }} type="primary" size="middle" onClick={() => navigate(-1)}>Back</Button>
                <h1>Your Orders</h1>
            </div>
            <Tabs
                defaultActiveKey={activeTab}
                onChange={handleTabChange}
                items={tabsData.map((tab) => ({
                    key: String(tab.lotStatusId),
                    label: tab.lotStatusName || `Tab ${tab.lotStatusId + 1}`,
                    children: (
                        <OrderList
                            lotStatusId={tab.lotStatusId}
                            lotStatusName={tab.lotStatusName}
                            userId={user?.UserId}
                            auctionLotList={auctionLotList}
                            soldLotList={soldLotList}
                        />
                    ),
                }))}
                className="order-tabs"
            />
        </div>
    );
}

const OrderList = ({ auctionLotList, soldLotList, lotStatusId, lotStatusName, userId }) => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seed, setSeed] = useState(1);
    const handleReset = () => setSeed(seed + 1);
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const filteredData = [];
                if (soldLotList) {
                    soldLotList.forEach(soldLot => {
                        if (soldLot.winnerId === userId) {
                            auctionLotList.forEach(auctionLot => {
                                if (auctionLot.lotDto.lotId === soldLot.soldLotId && auctionLot.lotDto.lotStatusDto.lotStatusId === lotStatusId) {
                                    filteredData.push({
                                        ...auctionLot.lotDto,
                                        finalPrice: soldLot.finalPrice
                                    });
                                }
                            });
                        }
                    });
                }
                console.log("filteredData", filteredData);
                setOrderList(filteredData);
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchOrderData();
        }
    }, [seed]);

    return loading ? (
        <Spin />
    ) : (
        <List
            itemLayout="vertical"
            dataSource={orderList}
            renderItem={(order) => (
                <List.Item>
                    <LotCard lot={order} refresh={handleReset} />
                </List.Item>
            )}
            locale={{ emptyText: `No ${lotStatusName} orders` }}
        />
    );
};

const LotCard = ({ lot, refresh }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => setIsModalVisible(!isModalVisible);
    const [isLotInfoModalVisible, setIsLotInfoModalVisible] = useState(false);
    const toggleLotInfoModal = () => setIsLotInfoModalVisible(!isLotInfoModalVisible);
    const handleOperation = async () => {
        try {
            await Promise.all([
                lotApi.put(`lots/${lot.lotId}/status`, {
                    lotStatusName: "Completed"
                }),
                paymentApi.post(`payout`, {
                    Amount: lot.finalPrice,
                    BreederId: lot.breederId
                })])
                .then(([response, paymentResponse]) => {
                    console.log("response", response.data);
                    console.log("paymentResponse", paymentResponse.data);
                    message.success('Delivery confirmed successfully');
                });
            refresh();
        } catch (error) {
            message.error(error.message);
        }
    };
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
                            src={lot.koiFishDto.koiMedia?.[0]?.filePath || "default-placeholder.png"}
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
                            <span>{lot.finalPrice || "..."}</span>
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className="lot-detail-item">
                            <Button size="middle" type="primary" onClick={toggleLotInfoModal}>View</Button>
                            {lot.lotStatusDto.lotStatusId === 7 && <Popconfirm
                                title="Are you sure?"
                                onConfirm={() => handleOperation()}
                            >
                                <Button type="primary" >
                                    Confirm Delivery
                                </Button>
                            </Popconfirm>}
                        </div>
                    </Col>
                </Row>
            </Card>
            <Modal
                open={isLotInfoModalVisible}
                onCancel={toggleLotInfoModal}
                footer={null}
                width={1200}
                style={{ top: 0 }}
            >
                <LotInfoModal
                    lotInfoData={lot}
                    uploadKoiMediaData={lot.koiFishDto.koiMedia || []}
                    refresh={refresh}
                />
            </Modal>
        </div>
    );
};
const LotInfoModal = ({ lotInfoData }) => {
    const defaultImage = "default-placeholder.png";
    const koiImage = lotInfoData.koiFishDto.koiMedia?.[0]?.filePath || defaultImage;

    const tableDataSource = [
        { key: 'sku', label: 'SKU', value: lotInfoData.sku },
        { key: 'variety', label: 'Variety', value: lotInfoData.koiFishDto.variety },
        { key: 'size', label: 'Size', value: `${lotInfoData.koiFishDto.sizeCm} cm` },
        { key: 'yearOfBirth', label: 'Year of Birth', value: `${lotInfoData.koiFishDto.yearOfBirth}` },
        { key: 'sex', label: 'Sex', value: lotInfoData.koiFishDto.sex ? "Male" : "Female" },
        { key: 'farm', label: 'Farm', value: lotInfoData.breederDetailDto?.farmName },
        { key: 'method', label: 'Auction Method', value: lotInfoData.auctionMethod.auctionMethodName },
        { key: 'status', label: 'Status', value: lotInfoData.lotStatusDto.lotStatusName },
    ];

    return (
        <div className="lot-info-modal">
            <Row gutter={[32, 32]}>
                <Col span={14}>
                    <h2 className="lot-info-title" >Lot Detail</h2>
                    <br />
                    <div className="lot-info-content">
                        <div className="info-section">
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