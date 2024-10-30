import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Popconfirm, Col, Row, Image, Typography, Modal, Form } from "antd";
import lotApi from "../../config/lotApi";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";
import { useNavigate } from "react-router-dom";
import LotInfo from "../../components/lot-info";
const { Text } = Typography;
const dataSample = [
    {
        "lotId": 8,
        "sku": "BRD14-185410-22102024",
        "startingPrice": 50000000.00,
        "createdAt": "2024-10-22T18:54:11.47",
        "auctionMethod": {
            "auctionMethodId": 1,
            "auctionMethodName": "Fixed-Price Auction",
            "description": null
        },
        "finishPrice": 100000000.00,
        "breederId": 14,
        "koiFishDto": {
            "variety": "GayLord",
            "sex": true,
            "sizeCm": 100.00,
            "yearOfBirth": 2000,
            "weightKg": 100.00,
            "koiMedia": [
                {
                    "koiMediaId": 7,
                    "koiFishId": 8,
                    "filePath": "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/15f3c439-765e-4026-892b-e16b148ca7e1.jpg?alt=media&token=12fd9868-c15f-4441-9dd9-c8d2bbdbb79e"
                }
            ]
        },
        "lotStatusDto": {
            "lotStatusId": 6,
            "lotStatusName": "To Ship"
        },
        "breederDetailDto": {
            "farmName": "hehehoho"
        }
    }
]
export default function OrderStatusPage() {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("4");
    const dispatch = useDispatch();
    const [seed, setSeed] = useState(1);
    const navigate = useNavigate();

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
    const handleReset = () => {
        setSeed(Math.random());
    };
    useEffect(() => {
        setTabsData([
            {
                lotStatusId: 6,
                lotStatusName: "To Ship",
            },
            {
                lotStatusId: 7,
                lotStatusName: "To Receive",
            },
            {
                lotStatusId: 8,
                lotStatusName: "Completed",
            },
        ]);
        setLoading(false);
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);
        dispatch(setStatusId(key));
    };

    const items = tabsData.map((tab) => ({
        key: String(tab.lotStatusId),
        label: tab.lotStatusName || `Tab ${tab.lotStatusId + 1}`,
        children: (
            <OrderList
                key={seed}
                lotStatusId={tab.lotStatusId}
                lotStatusName={tab.lotStatusName}
                refresh={handleReset}
            />
        ),
    }));
    return loading ? (
        <Spin />
    ) : (
        <div className="order-status-container">
            <div className="header-section">
                <Button style={{ marginBottom: 20 }} type="primary" size="middle" onClick={() => navigate(-1)}>Back</Button>
                <h1>Orders Status</h1>
            </div>
            <Tabs
                defaultActiveKey={activeTab}
                onChange={handleTabChange}
                items={items}
                className="order-tabs"
            />
        </div>
    );
}

const OrderList = ({ lotStatusId, lotStatusName, refresh }) => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrderData = async () => {
        try {
            // const response = await lotApi.get("lots");
            // const data = response.data.filter((lot) => lot.lotStatusDto.lotStatusId === lotStatusId);
            const data = dataSample.filter((lot) => lot.lotStatusDto.lotStatusId === lotStatusId);
            setOrderList(data);
            setLoading(false);
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
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

const LotCard = ({ lot, refetch }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const userRoleId = useSelector((store) => store.user.user?.UserRoleId);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <Card
                className="lot-card"
                title={
                    <div className="lot-card-title">
                        {`${lot.koiFishDto.variety} #${lot.sku}`}
                    </div>
                }
                hoverable
                onClick={showModal}
            >
                <Row gutter={[16, 16]}>
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
                        <Image
                            src={
                                lot.koiFishDto.koiMedia?.[0]?.filePath ||
                                "default-placeholder.png"
                            }
                            width={80}
                            height={80}
                        />
                    </Col>
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
                        {userRoleId > 2 && (
                            <>
                                <Text strong>By: </Text>
                                <span>{lot.breederDetailDto?.farmName || "Unknown"}</span>
                                <br />
                            </>
                        )}
                        <Text strong>Finish Price: </Text>
                        <span>{lot.finishPrice || "..."}</span>
                    </Col>
                </Row>
            </Card>
            <Modal
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width={1200}
            >
                <LotInfoModal
                    title={"Lot Detail"}
                    lotInfoData={lot}
                    uploadKoiMediaData={lot.koiFishDto.koiMedia || []}
                />
            </Modal>
        </>
    );
};
const LotInfoModal = ({
    title,
    uploadKoiMediaData,
    lotInfoData,
    showLotStatus,
}) => {
    const [form] = Form.useForm();
    return (
        <div className="lot-info-modal">
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    koiMedia: uploadKoiMediaData,
                }}
                disabled={true}
            >
                <Row gutter={[24, 24]}>
                    <Col span={14}>
                        <h2 style={{ fontWeight: "bold" }}>{title}</h2>
                        <LotInfo
                            initData={lotInfoData}
                            showLotStatus={showLotStatus}
                            form={form}
                        />

                    </Col>
                    <Col span={10}>
                        <Image
                            src={
                                lotInfoData.koiFishDto.koiMedia?.[0]?.filePath ||
                                "default-placeholder.png"
                            }
                            width={200}
                            height={200}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
};