import React, { useState, useEffect } from "react";
import { Tabs, Spin, message, Card, List, Button, Popconfirm } from "antd";
import lotApi from "../../config/lotApi";
import { useDispatch } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";
import { useNavigate } from "react-router-dom";

export default function AuctionManagementPage() {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("1");
    const dispatch = useDispatch();
    const [seed, setSeed] = useState(1);
    const navigate = useNavigate();

    const fetchTabsData = async () => {
        if (tabsData.length === 0) {
            try {
                const response = await lotApi.get("lot-statuses");
                const data = response.data;
                setTabsData(data);
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleReset = () => {
        setSeed(Math.random());
    };
    useEffect(() => {
        setTabsData([
            {
                auctionStatusId: 1,
                auctionStatusName: "Upcoming",
            },
            {
                auctionStatusId: 2,
                auctionStatusName: "Ongoing",
            },
            {
                auctionStatusId: 3,
                auctionStatusName: "Past",
            },
        ]);
        setLoading(false);
    }, []);

    const handleTabChange = (key) => {
        setActiveTab(key);
        dispatch(setStatusId(key));
    };

    const items = tabsData.map((tab) => ({
        key: String(tab.auctionStatusId),
        label: tab.auctionStatusName || `Tab ${tab.auctionStatusId + 1}`,
        children: (
            <AuctionList
                key={seed}
                auctionStatusId={tab.auctionStatusId}
                auctionStatusName={tab.auctionStatusName}
                refresh={handleReset}
            />
        ),
    }));
    const handleClickCreate = () => {
        navigate(`/management/create-auction-request`)
    }
    return loading ? (
        <Spin />
    ) : (
        <>
            <div >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '0',
                    marginRight: '20px',
                }}>
                    <h1>Auction Management</h1>
                    <Button type="primary" size="large" onClick={handleClickCreate}>Create auction</Button>
                </div>
                <Tabs defaultActiveKey={activeTab} onChange={handleTabChange} items={items} />
            </div >
        </>
    );
}

const AuctionList = ({ auctionStatusId, auctionStatusName, refresh }) => {
    const [auctionList, setAuctionList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAuctionData = async () => {
        try {
            const response = await lotApi.get("auctions");
            let data;
            const now = new Date();
            if (auctionStatusId === 1) {
                data = response.data.filter((auction) => new Date(auction.startTime) > now);
            } else if (auctionStatusId === 2) {
                data = response.data.filter(
                    (auction) =>
                        new Date(auction.startTime) <= now && new Date(auction.endTime) >= now
                );
            } else if (auctionStatusId === 3) {
                data = response.data.filter((auction) => new Date(auction.endTime) < now);
            }
            setAuctionList(data);
            setLoading(false);
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        fetchAuctionData();
    }, [auctionStatusId]);

    return loading ? (
        <Spin />
    ) : (
        <List
            itemLayout="vertical"
            dataSource={auctionList}
            renderItem={(auction) => (
                <List.Item>
                    <AuctionCard auction={auction} refresh={refresh} />
                </List.Item>
            )}
            locale={{ emptyText: `No ${auctionStatusName} auctions` }}
        />
    );
};

const AuctionCard = ({ auction, refresh }) => {
    const navigate = useNavigate();
    const handleDelete = async (auctionId) => {
        try {
            const response = await lotApi.delete(`auctions/${auctionId}`);
            message.success("Deleted successfully!");
            console.log(response);
            refresh();
        } catch (error) {
            message.error("Failed to delete the auction.");
        }
    };

    return (
        <Card
            title={`${auction.auctionName}`}
            bordered={false}
            className="auction-card"
            onClick={() =>
                navigate(`/auction-detail?auction-id=${auction.auctionId}`)
            }
            extra={
                <>
                    <div
                        className="button-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            marginTop: '20px'
                        }}
                    >

                        <Button
                            type="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/management/update-auction-request?auction-id=${auction.auctionId}`)
                            }}
                        >
                            Update
                        </Button>
                        <Popconfirm
                            title="Are you sure?"
                            onConfirm={(e) => {
                                e.stopPropagation();
                                handleDelete(auction.auctionId)
                            }}
                        >
                            <Button type="primary" danger
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                </>
            }
        />
    );
};
