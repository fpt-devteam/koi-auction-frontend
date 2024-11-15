import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Col, Row, Image, Typography, Modal, Table, Popconfirm, Statistic } from "antd";
import lotApi from "../../config/lotApi";
import './index.css';
const { Text } = Typography;

import paymentApi from "../../config/paymentApi";
import soldLotApi from "../../config/soldLotApi";
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};
const formartMoney = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const SoldLotCard = ({ soldLot, refresh, tabData, user, refetch }) => {
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [soldLotList, setSoldLotList] = useState([]);

    const [isLotInfoModalVisible, setIsLotInfoModalVisible] = useState(false);

    const toggleLotInfoModal = () => setIsLotInfoModalVisible(!isLotInfoModalVisible);
    const toggleOrderModal = () => setIsOrderModalVisible(!isOrderModalVisible);


    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [isViewOrderModalVisible, setIsViewOrderModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const handleClickDetailModal = () => setIsDetailModalVisible(!isDetailModalVisible);
    const handleClickDeliveryModal = () => setIsDeliveryModalVisible(!isDeliveryModalVisible);
    const handleClickCancelModal = () => setIsCancelModalVisible(!isCancelModalVisible);
    const handleClickViewOrderModal = () => setIsViewOrderModalVisible(!isViewOrderModalVisible);
    // const soldLot = {
    //     lotDto: {
    //         lotId: soldLot?.soldLotId,
    //         sku: soldLot?.sku,
    //         breederId: 17,
    //         koiFishDto: soldLot?.koiFish,

    //     },
    //     lotStatusDto: soldLot?.lotStatus,
    //     breederDetailDto: soldLot?.breederDetailDto,
    //     address: soldLot?.address,
    //     winnerDto: soldLot?.winnerDto,
    //     finalPrice: soldLot?.finalPrice,
    //     auctionDeposit: soldLot?.auctionDepositDto?.amount,
    //     createdAt: soldLot?.createdAt,
    //     updatedAt: soldLot?.updatedAt,
    //     expTime: soldLot?.expTime
    // };

    const handleLotDelete = async () => {
        try {
            await lotApi.delete(`lots/${soldLot?.lotDto?.lotId}`);
            message.success("Deleted successfully!");
            refetch();
        } catch (error) {
            message.error("Failed to delete lot: " + error.message);
        }
    };
    const handleLotComplete = async () => {
        try {
            console.log(soldLot);
            await Promise.all([
                lotApi.put(`lots/${soldLot?.lotDto?.lotId}/status`, {
                    lotStatusName: "Completed",
                }),
                paymentApi.post(`payout`, {
                    Amount: soldLot?.finalPrice,
                    BreederId: soldLot?.breederId,
                }),
            ]).then(([response, paymentResponse]) => {
                console.log("response", response.data);
                console.log("paymentResponse", paymentResponse.data);
                message.success('Completed successfully!');
            });
            refetch();
        } catch (error) {
            message.error("Failed to complete lot: " + error.message);
        }
    };

    const handleOperation = async () => {
        try {
            await Promise.all([
                lotApi.put(`lots/${soldLot.lotId}/status`, {
                    lotStatusName: "Completed"
                }),
                paymentApi.post(`payout`, {
                    Amount: soldLot.finalPrice,
                    BreederId: soldLot.breederId
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
        <>
            <Card
                className="lot-card-wrapper"
                title={
                    <div className="lot-card-title" >
                        <span style={{ color: "#838181" }}>#{soldLot?.lotDto?.lotId} - </span>
                        <span >{soldLot?.lotDto?.sku}</span>
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
                        gap: "32px",
                        margin: "0px"
                    }}>
                        <Button type="primary" size="large" key="view-order" onClick={toggleOrderModal}>View Order</Button>
                        <Button size="large" key="view-lot" onClick={toggleLotInfoModal}>View Lot</Button>
                        {user?.userRoleId == 2 && tabData.lotStatusId < 3 && (
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
                        {user?.userRoleId > 2 && tabData.lotStatusId == 7 && (
                            <>
                                <h1>logb</h1>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    onClick={handleClickDeliveryModal}
                                >
                                    Delivery
                                </Button>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    onClick={handleClickCancelModal}
                                    danger
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                        {tabData.lotStatusId > 5 && (
                            <>
                                <Button type="primary" size="large" key="view-order" onClick={handleClickViewOrderModal}>View Order</Button>
                            </>
                        )}
                        {user?.userRoleId > 2 && tabData.lotStatusId == 8 && (
                            <>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    onClick={handleLotComplete}
                                >
                                    Complete
                                </Button>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    onClick={handleClickCancelModal}
                                    danger
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>,
                ]}
            >
                <Row style={{ gap: "16px" }}>
                    <Col span={3} style={{}}>
                        <Image
                            src={soldLot?.lotDto?.koiFishDto?.koiMedia?.[0].filePath}
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
                                <Text className="lot-detail-item-content">{soldLot?.lotDto?.koiFishDto?.variety}</Text>
                            </div>
                            <div className="lot-detail-item">
                                <Text className="lot-detail-item-title">By: </Text>
                                <Text className="lot-detail-item-content">{soldLot?.breederDetailDto?.breederId}</Text>
                            </div>
                            <div className="lot-detail-item">
                                <Text className="lot-detail-item-title">Farm Name: </Text>
                                <Text className="lot-detail-item-content">{soldLot?.breederDetailDto?.farmName}</Text>
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="lot-detail-item">
                            <Text className="lot-detail-item-title">Total Price: </Text>
                            <Text className="lot-detail-item-content-money">
                                {(soldLot) ? formartMoney(soldLot?.finalPrice) : "..."} VND
                            </Text>
                        </div>
                    </Col>
                </Row>
                <Modal
                    open={isLotInfoModalVisible}
                    onCancel={toggleLotInfoModal}
                    footer={null}
                    width={1200}
                    style={{ top: 0 }}
                >
                    <LotInfoModal
                        lotInfoData={soldLot}
                        refresh={refresh}
                    />
                </Modal>
                <Modal
                    open={isOrderModalVisible}
                    onCancel={toggleOrderModal}
                    footer={null}
                    width={1200}
                    style={{ top: 0 }}
                >
                    <OrderInfoModal
                        soldlotInfoData={soldLot}
                        onCancel={toggleOrderModal}
                        user={user}
                    />
                </Modal>
            </Card >
        </>

    );
};
const LotInfoModal = ({ lotInfoData }) => {
    const tableDataSource = [
        {
            key: 'sku', label: 'SKU',
            value: <div className="info-content">{lotInfoData?.lotDto?.sku}</div>
        },
        {
            key: 'variety', label: 'Variety',
            value: <div className="info-content">{lotInfoData?.lotDto?.koiFishDto?.variety}</div>
        },
        {
            key: 'size', label: 'Size',
            value: <div className="info-content">{`${lotInfoData?.lotDto?.koiFishDto?.sizeCm} cm`}</div>
        },
        {
            key: 'yearOfBirth', label: 'Year of Birth',
            value: <div className="info-content">{`${lotInfoData?.lotDto?.koiFishDto?.yearOfBirth}`}</div>
        },
        {
            key: 'sex', label: 'Sex',
            value: <div className="info-content">{lotInfoData?.lotDto?.koiFishDto?.sex ? "Male" : "Female"}</div>
        },
        {
            key: 'breeder', label: 'Breeder',
            value: <div className="info-content">{lotInfoData?.breederDetailDto?.farmName}</div>
        },
        {
            key: 'farm', label: 'Farm',
            value: <div className="info-content">{lotInfoData?.breederDetailDto?.farmName}</div>
        },
        {
            key: 'status', label: 'Status',
            value: <div className="info-content">{lotInfoData?.lotStatusDto?.lotStatusName}</div>
        },
    ];

    return (
        <div className="lot-info-modal">
            <Row gutter={[32, 32]}>
                <Col span={14}>
                    <h2 className="lot-info-title" >Lot Detail</h2>
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
                                        render: (text) => <p className="info-label" >{text}</p>
                                    },
                                    {
                                        title: 'Value',
                                        dataIndex: 'value',
                                        key: 'value',
                                    }
                                ]}
                                pagination={false}
                                size="large"
                                bordered
                            />
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className="image-container">
                        <Image
                            className="lot-image"
                            src={lotInfoData?.lotDto?.koiFishDto?.koiMedia?.[0].filePath}
                            width="100%"
                            alt="Koi Fish"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
const OrderInfoModal = ({ soldlotInfoData, onCancel, user }) => {
    const winner = soldlotInfoData.winnerDto;
    const handlePayment = () => {
        message.success("Click Payment");
    };
    return (
        <>
            <div style={{ padding: "36px", paddingTop: "0px" }}>
                <div style={{ paddingTop: "24px" }}>
                    <div className="inner-card-container">
                        <Card
                            className="inner-card"
                            title={
                                <p className="inner-card-title">
                                    Delivery Infomation
                                </p>
                            }
                        >
                            <div className="info-container">
                                <span className="info-label">Full Name: </span>
                                <span className="info-content">{winner?.firstName + winner?.lastName}</span>
                            </div>
                            <div className="info-container">
                                <span className="info-label">Phone: </span>
                                <span className="info-content">{winner?.phone}</span>
                            </div>
                            <div className="info-container">
                                <span className="info-label">Email: </span>
                                <span className="info-content">{winner?.email}</span>
                            </div>
                            <div className="info-container">
                                <span className="info-label">Address: </span>
                                <span className="info-content">{soldlotInfoData?.address}</span>
                            </div>
                        </Card>
                        <Card
                            className="inner-card"
                            title={
                                <p className="inner-card-title">
                                    Status
                                </p>
                            }
                        >
                            <div className="info-container">
                                <span className="info-label">Status: </span>
                                <span className="info-content">{(soldlotInfoData) ? soldlotInfoData?.lotStatusDto?.lotStatusName : "N/A"}</span>
                            </div>
                            <div className="info-container">
                                <span className="info-label">Update at: </span>
                                <span className="info-content">{(soldlotInfoData) ? formatDateTime(soldlotInfoData?.createdAt) : "...."}</span>
                            </div>
                        </Card>
                    </div>
                    <Card className="inner-card">
                        <div>
                            <Row>
                                <Col className="info-field" span={4}>
                                    <Image
                                        src={soldlotInfoData?.lotDto?.koiFishDto?.koiMedia?.[0]?.filePath}
                                        width={"100%"}
                                        height={"100%"}
                                        alt="Koi Fish"
                                    />
                                </Col>
                                <Col className="info-field" span={20}>
                                    <h2 className="info-title">Koi Fish Infomation</h2>
                                    <div className="divider"><hr /></div>
                                    <Row>
                                        <Col span={14}>
                                            <div className="info-container">
                                                <span className="info-label">Variety: </span>
                                                <span className="info-content">{soldlotInfoData?.lotDto?.koiFishDto?.variety || "..."}</span>

                                            </div>
                                            <div className="info-container">
                                                <span className="info-label">Farm Name: </span>
                                                <span className="info-content">{soldlotInfoData?.breederDetailDto?.farmName || "Unknown"}</span>
                                            </div>
                                        </Col>
                                        <Col span={10}>
                                            <div className="info-container">
                                                <span className="info-label">Final Price: </span>
                                                <span className="info-content">{(soldlotInfoData) ? formartMoney(soldlotInfoData?.finalPrice) : "..."} VND</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <Row>
                                <Col span={12}>
                                    {soldlotInfoData?.lotStatusDto?.lotStatusId == 6 &&
                                        (
                                            <Statistic.Countdown
                                                value={soldlotInfoData?.expTime}
                                                format="HH:mm:ss"
                                                valueStyle={{
                                                    fontSize: "2.5rem",
                                                }}
                                            />
                                        )
                                    }
                                </Col>
                                <Col span={12}>
                                    <Row>
                                        <Col className="info-payment-item-title" span={18}>
                                            <span>Total Price</span>
                                        </Col>
                                        <Col className="info-payment-item-content" span={6}>
                                            <span>{(soldlotInfoData) ? formartMoney(soldlotInfoData?.finalPrice) : "..."} VND</span>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="info-payment-item-title" span={18}>
                                            <span>Deposit</span>
                                        </Col>
                                        <Col className="info-payment-item-content" span={6}>
                                            <span>{(soldlotInfoData?.auctionDeposit) ? formartMoney(soldlotInfoData?.auctionDeposit) : "..."} VND</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="info-payment-item-title" span={18}>
                                            <span>Pay</span>
                                        </Col>
                                        <Col className="info-payment-item-content" span={6}>
                                            <span>{(soldlotInfoData) ? formartMoney(soldlotInfoData?.finalPrice - soldlotInfoData?.auctionDeposit) : "..."} VND</span>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col className="info-payment-item-title" span={18}>
                                            <span>Payment Status </span>
                                        </Col>
                                        <Col className="info-payment-item-content" span={6}>
                                            <span>{(soldlotInfoData?.lotStatusDto?.lotStatusId > 6 ? (soldlotInfoData?.lotStatusDto?.lotStatusId != 11) ? "Success" : "Fail"
                                                : "Pending")}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                        </div>
                    </Card>
                </div>

                <div key="button-container" style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "36px",
                    margin: "24px"
                }}>
                    {(user?.UserRoleId == 1 && soldlotInfoData?.lotStatusDto?.lotStatusId == 6) && (
                        <Button type="primary" size="large" key="view-lot" onClick={handlePayment}>
                            Payment
                        </Button>
                    )}
                    <Button size="large" key="view-order" onClick={onCancel} >Cancel</Button>
                </div>
            </div>
        </>
    )
}
export default SoldLotCard;