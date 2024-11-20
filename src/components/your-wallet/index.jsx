import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  Space,
  Modal,
  InputNumber,
  Input,
  Checkbox,
  message,
  Row,
  Col,
  Card,
  Descriptions,
} from "antd";
import {
  SmileOutlined
} from "@ant-design/icons";
import Form from "antd/es/form/Form";
import paymentApi from "../../config/paymentApi";
import WalletAction from "../wallet-action";

const { Title } = Typography;
const MIN_DEPOSIT_AMOUNT = 1000;
const MIN_WITHDRAWAL_AMOUNT = 50000;

function YourWallet({ balance, refresh, user }) {
  // //console.log("user", user);
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };
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

  const handleDepositSubmit = async (values) => {
    // //console.log("Depositing amount:", values.depositAmount);
    try {
      const response = await paymentApi.post("/deposit", {
        Amount: values.depositAmount,
        Description: "Deposit to wallet " + values.depositAmount,
      });
      // //console.log(response.data.order_url);

      window.open(response.data.order_url, "_blank");
    } catch (error) {
      // //console.log(error);
    }
    setDepositModal(false);
    refresh();
  };
  const handleWithdrawalSubmit = async (values) => {
    try {
      const response = await paymentApi.post("/withdraw", {
        Amount: values.withdrawalAmount,
        BankAccount: values.bankAccount,
        BankName: values.bankName,
        AccountHolder: values.accountHolder,
      });
      // //console.log(response.data);
      message.success("Your withdrawal request submitted successfully");
      // window.location.reload();
      refresh();
    } catch (error) {
      // //console.log(error);
    }
    setWithdrawalModal(false);
  };
  return (
    <>
      <Space
        direction="vertical"
        size="large"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          size={140}
          icon={<SmileOutlined />}
          style={{ backgroundColor: "#FEDF65" }}
        />
        <Title level={3} style={{ margin: 0 }}>
          Wallet Balance
        </Title>
        <Title level={1} style={{ margin: 0 }}>
          {balance.toLocaleString()} VND
        </Title>
      </Space>
      {/* <Card title="Card Title">
        <Card.Grid style={gridStyle}>
          {" "}
          <CreditCardOutlined
            style={{
              fontSize: "32px",
              marginBottom: "8px",
              color: "#d9d9d9",
            }}
          />
        </Card.Grid>
        <Card.Grid
          style={{
            width: "50%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Balance
          </Title>
          <Title level={3} style={{ margin: 0 }}>
            {balance.toLocaleString()} VND
          </Title>
        </Card.Grid>
      </Card> */}

      <WalletAction
        role={user.UserRoleId}
        onDeposit={handleDeposit}
        onWithdrawal={handleWithdrawal}
      />

      <Modal
        title="Deposit Funds"
        open={depositModal}
        onCancel={handleDepositCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          onFinish={handleDepositSubmit}
          layout="vertical"
          style={{ maxWidth: "100%", padding: "20px" }}
        >
          <Form.Item
            label="Deposit Amount"
            name="depositAmount"
            rules={[
              () => ({
                validator(_, value) {
                  if (value !== undefined && value !== null) {
                    if (value >= MIN_DEPOSIT_AMOUNT) {
                      return Promise.resolve();
                    }
                    if (value < 0) {
                      return Promise.reject(
                        new Error(`The deposit amount cannot be negative`)
                      );
                    } else if (value < MIN_DEPOSIT_AMOUNT) {
                      return Promise.reject(
                        new Error(
                          `The minimum deposit amount is ${MIN_DEPOSIT_AMOUNT} VND`
                        )
                      );
                    }
                  }
                  return Promise.reject(
                    new Error("Please enter a number for deposit amount")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              placeholder="Enter amount"
              style={{
                width: "100%",
                borderRadius: "4px",
                borderColor: "#d9d9d9",
              }}
              size="large"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="isAcceptPolicy"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the policy")),
              },
            ]}
          >
            <Checkbox size="large" style={{ marginRight: 10 }}>
              I accept the policy and terms of use
            </Checkbox>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space size="middle">
              <Button
                onClick={handleDepositCancel}
                size="large"
                style={{ backgroundColor: "#f0f0f0", borderColor: "#d9d9d9" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Withdraw Funds"
        open={withdrawalModal}
        onCancel={handleWithdrawalCancel}
        footer={null}
        centered
        width={600}
      >
        <Form
          onFinish={handleWithdrawalSubmit}
          layout="vertical"
          style={{ maxWidth: "100%", padding: "20px" }}
        >
          <Form.Item
            label="Withdrawal Amount"
            name="withdrawalAmount"
            rules={[
              () => ({
                validator(_, value) {
                  if (value !== undefined && value !== null) {
                    if (Number.isNaN(value)) {
                      return Promise.reject(
                        new Error("Please enter a valid number")
                      );
                    }
                    if (typeof value !== "number") {
                      return Promise.reject(
                        new Error("Please enter a valid number")
                      );
                    }
                    if (value <= balance && value >= MIN_WITHDRAWAL_AMOUNT) {
                      return Promise.resolve();
                    }
                    if (value < 0) {
                      return Promise.reject(
                        new Error(`The withdrawal amount cannot be negative`)
                      );
                    } else if (value > balance) {
                      return Promise.reject(
                        new Error(
                          `The maximum withdrawal amount must not over your balance`
                        )
                      );
                    } else if (value < MIN_WITHDRAWAL_AMOUNT) {
                      return Promise.reject(
                        new Error(
                          `The minimum withdrawal amount is ${MIN_WITHDRAWAL_AMOUNT} VND`
                        )
                      );
                    }
                  }
                  return Promise.reject(
                    new Error("Please enter a number for withdrawal amount")
                  );
                },
              }),
            ]}
          >
            <InputNumber
              placeholder="Enter amount"
              style={{
                width: "100%",
                borderRadius: "4px",
                borderColor: "#d9d9d9",
              }}
              size="large"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please enter bank name" }]}
          >
            <Input
              placeholder="Enter Bank Name"
              size="large"
              style={{ borderRadius: "4px", borderColor: "#d9d9d9" }}
            />
          </Form.Item>

          <Form.Item
            name="bankAccount"
            label="Bank Account"
            rules={[{ required: true, message: "Please enter bank account" }]}
          >
            <Input
              placeholder="Enter Bank Account"
              size="large"
              style={{ borderRadius: "4px", borderColor: "#d9d9d9" }}
            />
          </Form.Item>

          <Form.Item
            name="accountHolder"
            label="Account Holder"
            rules={[{ required: true, message: "Please enter account holder" }]}
          >
            <Input
              placeholder="Enter Account Holder"
              size="large"
              style={{ borderRadius: "4px", borderColor: "#d9d9d9" }}
            />
          </Form.Item>

          <Form.Item
            name="isAcceptPolicy"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Please accept the policy")),
              },
            ]}
          >
            <Checkbox size="large" style={{ marginRight: 10 }}>
              I accept the policy and terms of use
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space size="middle">
              <Button
                onClick={handleWithdrawalCancel}
                size="large"
                style={{ backgroundColor: "#f0f0f0", borderColor: "#d9d9d9" }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default YourWallet;
