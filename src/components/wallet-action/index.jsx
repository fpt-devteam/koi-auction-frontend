import { Card, Col, Row } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  CreditCardOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import React from "react";

function WalletAction({ role, onPayment, onDeposit, onWithdrawal }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <Row gutter={24}>
        {role === 1 ? (
          <>
            <Col span={8}>
              <Card
                bordered={false}
                hoverable={true}
                onClick={() => {
                  onPayment();
                }}
                style={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <DollarOutlined
                  style={{
                    fontSize: "50px",
                    marginBottom: "8px",
                    color: "#d9d9d9",
                    alignItems: "center",
                  }}
                />
                <div style={{ textAlign: "center", fontWeight: "600" }}>Payment</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                bordered={false}
                hoverable={true}
                onClick={() => {
                  onDeposit();
                }}
                style={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
              
                <CreditCardOutlined
                  style={{
                    fontSize: "50px",
                    marginBottom: "8px",
                    color: "#d9d9d9",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div style={{ textAlign: "center", fontWeight: "600" }}>Deposit</div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                bordered={false}
                hoverable={true}
                onClick={() => {
                  onWithdrawal();
                }}
                style={{
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserOutlined
                  style={{
                    fontSize: "50px",
                    marginBottom: "8px",
                    color: "#d9d9d9",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <div style={{ textAlign: "center", fontWeight: "600" }}>Withdraw</div>
              </Card>
            </Col>
          </>
        ) : (
          <Col span={8} style={{margin: "0 auto"}}>
            <Card
              bordered={false}
              hoverable={true}
              onClick={() => {onWithdrawal()}}
              style={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserOutlined
                style={{
                  fontSize: "50px",
                  marginBottom: "8px",
                  color: "#d9d9d9",
                }}
              />
              <div style={{ textAlign: "center", fontWeight: "600" }}>Withdraw</div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default WalletAction;
