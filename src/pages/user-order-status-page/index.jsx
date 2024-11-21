import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Col, Row, Image, Typography, Modal, Table, Popconfirm } from "antd";
import lotApi from "../../config/lotApi";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";
import { useNavigate, useParams } from "react-router-dom";
import './index.css';
import paymentApi from "../../config/paymentApi";
import SoldLotCard from "../../components/sold-lot-card";
import userApi from "../../config/userApi";
const { Text } = Typography;
const staticTabsData = [
    { lotStatusId: 6, lotStatusName: "To Pay", lotStatusIconLink: "/src/assets/icon/payment-method.png" },
    { lotStatusId: 7, lotStatusName: "To Ship", lotStatusIconLink: "/src/assets/icon/shipping.png" },
    { lotStatusId: 8, lotStatusName: "To Receive", lotStatusIconLink: "/src/assets/icon/receiver.png" },
    { lotStatusId: 9, lotStatusName: "Completed", lotStatusIconLink: "/src/assets/icon/completed.png" },
    { lotStatusId: 10, lotStatusName: "Canceled", lotStatusIconLink: "/src/assets/icon/cancel.png" },
    { lotStatusId: 11, lotStatusName: "Payment Overdue", lotStatusIconLink: "/src/assets/icon/cancel.png" },

];
export default function UserOrderStatusPage() {
    const [activeTab, setActiveTab] = useState("1");
    const [loading, setLoading] = useState(true);
    const [seed, setSeed] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    const { user } = useSelector((store) => store.user);

    let { LotStatusId } = useParams();
    // staticTabsData.forEach((tab) => {
    //     if (tab.lotStatusId == LotStatusId) {
    //         //console.log("here", LotStatusId);
    //         //console.log("here", tab.lotStatusIconLink);
    //     }
    // })
    useEffect(() => {
        setActiveTab(LotStatusId);
        setLoading(true);
        // //console.log(staticTabsData)
        // //console.log(LotStatusId)
        async function fetchLotDataByStatus() {
            try {
                await Promise.all([
                    lotApi.get("/sold-lots", {
                        params: {
                            UserID: user.UserId,
                            LotStatusId: LotStatusId || 6,
                        }
                    }),
                    userApi.get("/manage/profile/address"),

                ]).then(([soldLotResponse, addressResponse]) => {
                    const soldLotList = soldLotResponse?.data?.reverse().map((soldLot) => ({
                        lotDto: {
                            lotId: soldLot?.soldLotId,
                            sku: soldLot?.sku,
                            koiFishDto: soldLot?.koiFish,
                        },
                        lotStatusDto: soldLot?.lotStatus,
                        breederDetailDto: {
                            ...soldLot.breederDetailDto,
                            farmAddress: addressResponse.data.find((add) => add.UserId == soldLot.breederId).Address || "Unknown",
                        },
                        updatedLot: soldLot?.updatedLot,
                        address: soldLot?.address,
                        winnerDto: soldLot?.winnerDto,
                        finalPrice: soldLot?.finalPrice,
                        auctionDeposit: soldLot?.auctionDepositDto?.amount,
                        createdAt: soldLot?.createdAt,
                        updatedAt: soldLot?.updatedAt,
                        expTime: soldLot?.expTime
                    }));
                    setOrderList(soldLotList);
                    setLoading(false);
                    // //console.log("soldLotList", soldLotList);
                })
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchLotDataByStatus();
    }, [LotStatusId]);

    const handleReset = () => setSeed(seed + 1);

    const handleTabChange = (key) => {
        navigate(`/order/${key}`);
    };
    return loading ? <Spin />
        : (
            <>
                <div className="order-status-container"> <div className="header-section">
                    <Button style={{ marginBottom: 20 }} type="primary" size="middle" onClick={() => navigate(-1)}>Back</Button>
                    <h1>Your Orders</h1>
                </div>
                    <Tabs
                        style={{ padding: "36px" }}
                        defaultActiveKey={activeTab}
                        onChange={handleTabChange}
                        size={"large"}
                        type="card"
                        items={staticTabsData.map((tab) => (
                            {
                                key: String(tab.lotStatusId),
                                label:
                                    <div
                                        className="tab-name-with-icon"
                                    >
                                        <Image width={24} height={24} preview={false} key={tab.lotStatusId} src={tab.lotStatusIconLink}></Image>
                                        <span className="tab-name">{tab.lotStatusName}</span>
                                    </div>,
                                children: (
                                    <>
                                        <OrderList
                                            tabData={tab}
                                            user={user}
                                            orderList={orderList}
                                            refresh={handleReset}
                                        />
                                    </>
                                ),
                            }))}
                        className="order-tabs"
                    />
                </div >
            </>
        );
}

const OrderList = ({ orderList, tabData, user, refresh }) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={orderList}
            renderItem={(order) => (
                <List.Item style={{ padding: "0px" }}>
                    <SoldLotCard soldLot={order} tabData={tabData} user={user} refresh={refresh} />
                </List.Item>
            )}
            locale={{ emptyText: `No ${tabData.lotStatusName} orders` }}
        />
    );
};