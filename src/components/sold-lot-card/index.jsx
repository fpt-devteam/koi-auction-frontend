import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Col, Row, Image, Typography, Modal, Table, Popconfirm, Statistic, Descriptions } from "antd";
import lotApi from "../../config/lotApi";
import './index.css';
const { Text } = Typography;

import paymentApi from "../../config/paymentApi";
import TextArea from "antd/es/input/TextArea";

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
    const [isLotInfoModalVisible, setIsLotInfoModalVisible] = useState(false);

    const toggleLotInfoModal = () => setIsLotInfoModalVisible(!isLotInfoModalVisible);
    const toggleOrderModal = () => setIsOrderModalVisible(!isOrderModalVisible);

    const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [cancelReason, setCancelReason] = useState("");

    const handleClickDeliveryModal = () => setIsDeliveryModalVisible(!isDeliveryModalVisible);
    const handleClickCancelModal = () => setIsCancelModalVisible(!isCancelModalVisible);

    const handleLotCancel = async () => {
        try {
            message.loading({ content: 'Loading...', key: 'cancel' });
            await Promise.all([
                await lotApi.put(`lots/${soldLot?.lotDto?.lotId}/status`, {
                    lotStatusName: "Canceled",
                    description: cancelReason,
                }),
                await paymentApi.post(`/manage/refund`, {
                    Amount: soldLot?.finalPrice,
                    UserId: soldLot?.winnerDto?.userId,
                    Description: `Refund for lot ${soldLot?.lotDto?.lotId}, total ${soldLot?.finalPrice} VND`
                })
            ]).then(([response, paymentResponse]) => {
                console.log("response", response.data);
                console.log("paymentResponse", paymentResponse.data);
                message.success({ content: 'Canceled successfully!', key: 'cancel' });
            });
        } catch (error) {
            message.error({ content: `${error.message}`, key: 'cancel' });
        }
    };
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
                    BreederId: soldLot?.breederDetailDto?.breederId,
                    Description: `Payout for lot ${soldLot?.lotDto?.lotId}, total ${soldLot?.finalPrice} but 90% for breeder ${soldLot?.breederDetailDto?.breederId} is ${0.9 * soldLot?.finalPrice}`,
                }),
            ]).then(([response, paymentResponse]) => {
                console.log("response", response.data);
                console.log("paymentResponse", paymentResponse.data);
                console.log(`Payout for lot ${soldLot?.lotDto?.lotId}, total ${soldLot?.finalPrice} but 90% for breeder ${soldLot?.breederDetailDto?.breederId} is ${0.9 * soldLot?.finalPrice}`)
                message.success('Completed successfully!');
            });
        } catch (error) {
            message.error("Failed to complete lot: " + error.message);
        }
    };
    const handleLotDelivery = async () => {
        try {
            await lotApi.put(`lots/${soldLot?.lotDto?.lotId}/status`, {
                lotStatusName: "To Receive",
            });
            message.success("Delivery approved");
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
                        {user?.UserRoleId == 2 && tabData.lotStatusId < 3 && (
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
                        {user?.UserRoleId > 2 && tabData.lotStatusId == 7 && (
                            <>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleClickDeliveryModal}
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
                <Modal
                    open={isDeliveryModalVisible}
                    onCancel={handleClickDeliveryModal}
                    footer={null}
                    width={1200}
                    style={{ top: 0 }}
                >
                    <div className="delivery-modal">
                        <h2>Delivery Information</h2>
                        <Table
                            dataSource={[
                                {
                                    key: "name",
                                    label: "Name",
                                    value:
                                        soldLot?.winnerDto?.firstName + " " + soldLot?.winnerDto?.lastName || "N/A",
                                },
                                {
                                    key: "phone",
                                    label: "Contact Number",
                                    value: soldLot?.winnerDto?.phone || "N/A",
                                },
                                {
                                    key: "email",
                                    label: "Email",
                                    value: soldLot?.winnerDto?.email || "N/A",
                                },
                                {
                                    key: "address",
                                    label: "Delivery Address",
                                    value: soldLot?.address || "N/A",
                                },
                            ]}
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
                                onClick={handleLotDelivery}
                            >
                                Approve
                            </Button>
                        </div>
                    </div>
                </Modal>
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
    const handlePayment = async () => {
        message.loading({ content: 'Loading...', key: 'payment' });
        console.log("soldlotInfoData", soldlotInfoData);
        try {
            await Promise.all([await paymentApi.post("/payment", {
                Amount: soldlotInfoData.finalPrice - soldlotInfoData.auctionDeposit,
                SoldLotId: soldlotInfoData.lotId,
                Description: `Payment for lot ${soldlotInfoData.lotId} - ${soldlotInfoData.finalPrice - soldlotInfoData.auctionDeposit} VND`
            }),
            await lotApi.put(`lots/${soldlotInfoData.lotDto.lotId}/status`, {
                lotStatusName: "To Ship"
            })]).then(([paymentResponse, updateResponse]) => {
                console.log("paymentResponse", paymentResponse.data);
                console.log("updateResponse", updateResponse.data);
                if (paymentResponse.data) {
                    message.success({ content: 'Payment success', key: 'payment' });
                    onCancel();
                } else {
                    message.error({ content: `${paymentResponse.data?.message}`, key: 'payment' });
                }
            });
        } catch (error) {
            message.error({ content: `${error.message}`, key: 'payment' });
        }
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