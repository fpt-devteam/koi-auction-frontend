import React, { useState, useEffect } from "react";
import { Spin, Button, Space, Table, Tabs, message } from "antd";
import { useNavigate } from "react-router-dom";
import paymentApi from "../../config/paymentApi";
import './index.css';
import Modal from "antd/es/modal/Modal";
import TextArea from "antd/es/input/TextArea";
import internalPaymentApi from "../../config/internalPaymentApi.js";

export default function StaffWithdrawStatusPage() {
    const [loading, setLoading] = useState(true);
    const [seed, setSeed] = useState(1);
    const navigate = useNavigate();

    const handleReset = () => setSeed(Math.random());

    useEffect(() => {
        setLoading(false);
    }, []);

    return loading ? (
        <Spin size="large" />
    ) : (
        <div className="page-container">
            <Tabs
                defaultActiveKey="1"
                className="withdraw-tabs"
                size="large"
                items={[
                    {
                        label: <span className="tab-pane">Pending</span>,
                        key: '1',
                        children: (
                            <div className="order-status-container">
                                <OrderList
                                    key={seed}
                                    statusName="Pending"
                                    isPending={true}
                                    refresh={handleReset}
                                />
                            </div>
                        ),
                    },
                    {
                        label: 'Approved',
                        key: '2',
                        children: (
                            <div className="order-status-container">

                                <OrderList
                                    key={seed}
                                    statusName="Success"
                                    isPending={false}
                                    refresh={handleReset}
                                />
                            </div>
                        ),
                    },
                    {
                        label: 'Rejected',
                        key: '3',
                        children: (
                            <div className="order-status-container">
                                <OrderList
                                    key={seed}
                                    statusName="Fail"
                                    isPending={false}
                                    refresh={handleReset}
                                />
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
}

const OrderList = ({ statusName, refresh, isPending }) => {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await paymentApi.get("/manage/get-transaction-history");
                const filteredTransactions = response?.data?.filter(
                    (trans) => trans.Status === statusName && trans.TransType === "Withdraw"
                ).map((trans) => ({
                    key: trans.TransId,
                    status: trans.Status,
                    transId: trans.TransId,
                    balanceAfter: trans.BalanceAfter,
                    amount: trans.Amount,
                    walletId: trans.WalletId,
                    userId: trans.UserId,
                    description: trans.Description,
                }));
                console.log("response", response.data)
                console.log("filteredTransactions", filteredTransactions);
                setTransactions(filteredTransactions || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [statusName, refresh]);

    const handleApprove = async (record) => {
        try {
            console.log("Approve transaction:", record);
            const response = await paymentApi.patch(`/manage/withdraw/${record.userId}/${record.transId}`, {
                Status: "Success"
            });
            message.success("Approve transaction successfully");
            console.log("Approve transaction response:", response);
        } catch (error) {
            console.error("Error approving transaction:", error);
        }
        refresh();
    };

    const handleReject = async (record) => {
        try {
            const response = await paymentApi.patch(`/manage/withdraw/${record.userId}/${record.transId}`, {
                Reason: rejectReason,
                Status: "Fail"
            });
            // console.log(rejectReason);
            message.success("Reject transaction successfully");
            setIsRejectModalOpen(false);
            setRejectReason('');
            setSelectedRecord(null);
        } catch (error) {
            console.error("Error rejecting transaction:", error);
        }
        refresh();
    };

    const columns = [
        {
            title: <span className="table-header">Transaction ID</span>,
            dataIndex: 'transId',
            key: 'transId',
        },
        {
            title: <span className="table-header">User ID</span>,
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: <span className="table-header">Amount</span>,
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `${amount?.toLocaleString()} VND`,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        isPending ? {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleApprove(record)}>Approve</Button>
                    <Button type="primary" danger onClick={() => {
                        setSelectedRecord(record);
                        setIsRejectModalOpen(true);
                    }}>Reject</Button>
                    <Modal
                        title="Reject Transaction"
                        open={isRejectModalOpen}
                        onCancel={() => {
                            setIsRejectModalOpen(false);
                            setRejectReason('');
                            setSelectedRecord(null);
                        }}
                        onOk={() => handleReject(selectedRecord)}
                    >
                        <TextArea
                            placeholder="Reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />
                    </Modal>
                </Space>
            ),
        } : null,
    ].filter(Boolean);

    return loading ? (
        <Spin />
    ) : (
        <div>
            {/* <h1>h1h1h1</h1> */}
            <Table
                columns={columns}
                dataSource={transactions}
                locale={{ emptyText: `No ${statusName} transactions` }}
            />
        </div>
    );
};
