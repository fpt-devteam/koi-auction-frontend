import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  Space,
  Modal,
  InputNumber,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Form from "antd/es/form/Form";
import paymentApi from "../../config/paymentApi";

const { Title } = Typography;

function YourWallet({ balance }) {
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(balance);
  const handleDeposit = () => {
    setDepositModal(true);
  };

  const handleWithdrawal = () => {
    setWithdrawalModal(true);
  };

  const handleDepositCancel = () => {
    setDepositModal(false);
  };

  const handleWithdrawalCancel = () => {
    setWithdrawalModal(false);
  };

  const handleDepositSubmit = async () => {
    // Here you would typically make an API call to process the deposit
    console.log("Depositing amount:", depositAmount);
    try {
      const response = await paymentApi.post("/deposit", {
        Amount: depositAmount,
      });
      console.log(response.data.order_url);
      window.location.href = response.data.order_url;
    } catch (error) {
      console.log(error);
    }
    setDepositModal(false);
    //navigate to the payment call back
    navigate(response.data.callback_url);
  };
  const handleWithdrawalSubmit = () => {
    console.log("Withdrawing amount:", withdrawalAmount);
    setWithdrawalModal(false);
    //navigate to the payment call back
  };
  return (
    <>
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#ffc0cb" }}
        />
        <Space>
          <Button type="default" size="large" onClick={handleDeposit}>
            Deposit
          </Button>
          <Button type="default" size="large" onClick={handleWithdrawal}>
            Withdrawal
          </Button>
        </Space>
        <Title level={1} style={{ margin: 0 }}>
          {balance} VND
        </Title>
      </Space>

      <Modal
        title="Deposit Funds"
        open={depositModal}
        onCancel={handleDepositCancel}
        footer={[
          <Button key="cancel" onClick={handleDepositCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleDepositSubmit}
            disabled={!depositAmount || depositAmount <= 0}
          >
            Submit
          </Button>,
        ]}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Typography.Text>
            Enter the amount you want to deposit:
          </Typography.Text>
          <InputNumber
            placeholder="Enter amount"
            style={{ width: "100%" }}
            min={0}
            value={depositAmount}
            onChange={(value) => setDepositAmount(value)}
          />
        </Space>
      </Modal>

      <Modal
        title="Withdraw Funds"
        open={withdrawalModal}
        onCancel={handleWithdrawalCancel}
        footer={[
          <Button key="cancel" onClick={handleWithdrawalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleWithdrawalSubmit}>
            Submit
          </Button>,
        ]}
      >
        <InputNumber
          placeholder="Enter  "
          style={{ width: "100%" }}
          max={balance}
          min={0}
          value={withdrawalAmount}
          onChange={(value) => setWithdrawalAmount(value)}
        />
      </Modal>
    </>
  );
}

export default YourWallet;
