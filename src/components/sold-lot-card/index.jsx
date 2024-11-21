import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Col, Row, Image, Typography, Modal, Table, Popconfirm, Statistic, Descriptions } from "antd";
import lotApi from "../../config/lotApi";
import './index.css';
const { Text } = Typography;

import paymentApi from "../../config/paymentApi";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

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
const SoldLotCard = ({ soldLot, refresh, tabData, user }) => {
    const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
    const [isLotInfoModalVisible, setIsLotInfoModalVisible] = useState(false);

    const toggleLotInfoModal = () => setIsLotInfoModalVisible(!isLotInfoModalVisible);
    const toggleOrderModal = () => setIsOrderModalVisible(!isOrderModalVisible);

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
                    <>
                        <div style={{ justifyContent: "right" }} key="money-container" className="lot-detail-item">
                            <Text className="lot-detail-item-title">Order Price: </Text>
                            <Text className="lot-detail-item-content-money">
                                {(soldLot) ? formartMoney(soldLot?.finalPrice - (soldLot?.auctionDeposit || 0)) : "..."} VND
                            </Text>
                        </div>
                        <br />
                        < div key="button-container" style={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "32px",
                            margin: "0px"
                        }}>
                            <Button type="primary" size="large" key="view-order" onClick={toggleOrderModal}>View Order</Button>
                            <Button size="large" key="view-lot" onClick={toggleLotInfoModal}>View Lot</Button>
                        </div>
                    </>

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
                    <Col span={12} style={{}}>
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
                    <Col span={6}>
                        <div style={{
                            justifyContent: "right"
                        }} className="lot-detail-item">
                            <Text  >Winning Price: </Text>
                            <Text  >
                                {(soldLot) ? formartMoney(soldLot?.finalPrice) : "..."} VND
                            </Text>
                        </div>
                        {/* <div className="lot-detail-item">
                            <Text className="lot-detail-item-title">Order Price: </Text>
                            <Text className="lot-detail-item-content-money">
                                {(soldLot) ? formartMoney(soldLot?.finalPrice - soldLot?.auctionDeposit) : "..."} VND
                            </Text>
                        </div> */}
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
                        user={user}
                        tabData={tabData}
                        refresh={refresh}
                        onCancel={toggleOrderModal}
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
const OrderInfoModal = ({ refresh, soldlotInfoData, user, tabData, onCancel }) => {

    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const winner = soldlotInfoData.winnerDto;
    const [cancelReason, setCancelReason] = useState("");
    const handleClickCancelModal = () => setIsCancelModalVisible(!isCancelModalVisible);
    const handleCheckExpireTime = () => {
        return dayjs(soldlotInfoData?.expTime).isBefore(dayjs(), 'second');
    }
    const handleLotCancel = async () => {
        try {
            message.loading({ content: 'Loading...', key: 'cancel' });
            await Promise.all([
                await lotApi.put(`lots/${soldlotInfoData?.lotDto?.lotId}/status`, {
                    lotStatusName: "Canceled",
                    description: cancelReason,
                }),
                await paymentApi.post(`/manage/refund`, {
                    Amount: soldlotInfoData?.finalPrice,
                    UserId: soldlotInfoData?.winnerDto?.userId,
                    Description: `Refund for lot ${soldlotInfoData?.lotDto?.lotId}, total ${soldlotInfoData?.finalPrice} VND due to cancelation ${cancelReason}`
                })
            ]).then(([response, paymentResponse]) => {
                message.success({ content: 'Canceled successfully!', key: 'cancel' });
                onCancel();
                refresh();
            });
        } catch (error) {
            message.error({ content: `${error.message}`, key: 'cancel' });
        }
    };
    const handleLotComplete = async () => {
        try {
            await Promise.all([
                lotApi.put(`lots/${soldlotInfoData?.lotDto?.lotId}/status`, {
                    lotStatusName: "Completed",
                }),
                paymentApi.post(`payout`, {
                    Amount: soldlotInfoData?.finalPrice,
                    BreederId: soldlotInfoData?.breederDetailDto?.breederId,
                    Description: `Payout for lot ${soldlotInfoData?.lotDto?.lotId}, total ${soldlotInfoData?.finalPrice} but 90% for breeder ${soldlotInfoData?.breederDetailDto?.breederId} is ${0.9 * soldlotInfoData?.finalPrice}`,
                }),
            ]).then(([response, paymentResponse]) => {
                message.success('Completed successfully!');
                onCancel();
                refresh();
            });
        } catch (error) {
            message.error("Failed to complete lot: " + error.message);
        }
    };
    const handleLotDelivery = async () => {
        try {
            await lotApi.put(`lots/${soldlotInfoData?.lotDto?.lotId}/status`, {
                lotStatusName: "To Receive",
            });
            message.success("Delivery approved");
            onCancel();
            refresh();
        } catch (error) {
            message.error(error.message);
        }
    };
    const handlePayment = async () => {
        if (handleCheckExpireTime()) {
            message.error("Your order is out of time for payment!!!");
            onCancel();
            return;
        }

        message.loading({ content: 'Loading...', key: 'payment' });
        try {
            await Promise.all([await paymentApi.post("/payment", {
                Amount: soldlotInfoData.finalPrice - soldlotInfoData.auctionDeposit,
                SoldLotId: soldlotInfoData.lotId,
                Description: `Payment for lot ${soldlotInfoData?.lotDto?.lotId} - ${soldlotInfoData.finalPrice - soldlotInfoData.auctionDeposit} VND`
            }),
            await lotApi.put(`lots/${soldlotInfoData?.lotDto?.lotId}/status`, {
                lotStatusName: "To Ship"
            })]).then(([paymentResponse, updateResponse]) => {
                if (paymentResponse.data) {
                    message.success({ content: 'Payment success', key: 'payment' });
                } else {
                    message.error({ content: `${paymentResponse.data?.message}`, key: 'payment' });
                }
            });
            onCancel();
            refresh();
        } catch (error) {
            message.error({ content: `${error.message}`, key: 'payment' });
        }
    };
    return (
        <>
            <div style={{ padding: "36px", paddingTop: "0px" }}>
                <div style={{ paddingTop: "24px" }}>
                    <Row gutter={16} style={{ alignItems: "flex-end" }}>
                        <Col span={15}>
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
                        </Col>
                        <Col span={9}>
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
                        </Col>
                    </Row>

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
                                            <div className="info-container">
                                                <span className="info-label">Farm Address: </span>
                                                <span className="info-content">{soldlotInfoData?.breederDetailDto?.farmAddress || "Unknown"}</span>
                                            </div>
                                        </Col>
                                        <Col span={10}>

                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </div>
                        <div style={{ marginTop: "30px" }}>
                            <Row>
                                <Col span={8}>
                                    {soldlotInfoData?.lotStatusDto?.lotStatusId == 6 && handleCheckExpireTime() &&
                                        (
                                            <>
                                                <h2>Remain time for payment: </h2>
                                                <Statistic.Countdown
                                                    value={soldlotInfoData?.expTime}
                                                    format="HH:mm:ss"
                                                    valueStyle={{
                                                        fontSize: "2.5rem",
                                                    }}
                                                />
                                            </>
                                        )
                                    }
                                </Col>
                                <Col span={16}>
                                    <Row>
                                        <Col className="info-payment-item-title" span={18}>
                                            <span>Winning Price</span>
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
                                            <span>{formartMoney((soldlotInfoData?.auctionDeposit || 0))} VND</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="info-payment-item-title " span={18}>
                                            <span>Pay</span>
                                        </Col>
                                        <Col className="info-payment-item-content-money" span={6}>
                                            <span>{(soldlotInfoData) ? formartMoney(soldlotInfoData?.finalPrice - (soldlotInfoData?.auctionDeposit || 0)) : "..."} VND</span>
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
                    <Modal
                        title="Reason why cancel this lot"
                        open={isCancelModalVisible}
                        onCancel={() => {
                            setIsCancelModalVisible(false);
                        }}
                        onOk={handleLotCancel}
                    >
                        <TextArea
                            placeholder="Reason"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                    </Modal>
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
                    {user?.UserRoleId > 2 && tabData.lotStatusId == 7 && (
                        <>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleLotDelivery}
                            >
                                Delivery
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleClickCancelModal}
                                danger
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                    {user?.UserRoleId > 2 && tabData.lotStatusId == 8 && (
                        <>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleLotComplete}
                            >
                                Complete
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleClickCancelModal}
                                danger
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </div >
        </>
    )
}
export default SoldLotCard;