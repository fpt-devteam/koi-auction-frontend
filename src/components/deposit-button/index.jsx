import React, { useState } from "react";
import { Button, Modal, Typography, Row, Col } from "antd";

const { Text, Title, Link } = Typography;

//isOpen = true and isRegistered = false -> buttonText = "Register and deposit for bidding"
//isOpen = true and isRegistered = true -> buttonText = "Register and deposit successful"
//isOpen = false and isRegistered = false -> buttonText = "You have not registered for this auction"

//create an object to get that text




const DepositButton = ({ lotDto, isOpen, onDepositSubmit, depositAmount, depositRate, isRegistered }) => {
  
  const buttonText = isOpen
    ? isRegistered
      ? "Register and deposit successful"
      : "Register and deposit for bidding"
    : isRegistered
    ? "You have registered for this auction"
    : "You have not registered for this auction";

  const buttonStyle = isOpen
    ? isRegistered
      ? { backgroundColor: "#4CAF50", color: "#fff" } // Xanh lá cho success
      : { backgroundColor: "#b22222", color: "#fff" } // Đỏ cho trạng thái đăng ký
    : { backgroundColor: "#d9d9d9", color: "#595959" }; // Xám cho trạng thái không đăng ký thành công

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onDepositSubmit(depositAmount);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        disabled={isRegistered == true || isOpen == false}
        style={{
          ...buttonStyle,
          width: "100%",
          fontSize: "1.2rem",
          borderRadius: "5px",
          color: "#fff",
          padding: "25px",
          marginTop: "20px",
        }}
      >
        {buttonText}
      </Button>

      <Modal
        title={<Title level={4}>Register for bidding</Title>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Pay"
        cancelText="Cancel"
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="pay" type="primary" onClick={handleOk} style={{ borderColor: "#85c1e9" }}>
            Pay
          </Button>,
        ]}
      >
        <Link href="/policy" target="_blank" style={{ fontSize: "12px", color: "#1890ff", marginBottom: "10px", display: "inline-block" }}>
          Auction Terms and Conditions
        </Link>
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
            marginBottom: "10px",
          }}
        >
          <Text strong style={{ fontSize: "14px" }}>
            SKU: {" "}
          </Text>
          <Text>{lotDto.sku}</Text>
          <br />
          <Text strong style={{ fontSize: "14px" }}>
            Variety: {" "}
          </Text>
          <Text>{lotDto.koiFishDto.variety}</Text>
          <br />
          <Text strong style={{ fontSize: "14px" }}>
            Starting price: {" "}
          </Text>
          <Text style={{color: "red"}}>{lotDto.startingPrice?.toLocaleString()} VND</Text>
          <br />
          <Text strong style={{ fontSize: "14px" }}>
            Deposit rate: {" "}
          </Text>
          <Text>{depositRate * 100}%</Text>
          <br />
          <hr />

          <Row style={{ marginTop: "8px" }}>
            <Col span={12}>
              <Text strong style={{fontSize: "18px"}}>Deposit Amount: </Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text strong style={{ color: "red", fontSize: "18px" }}>
                {depositAmount?.toLocaleString()} VND
              </Text>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default DepositButton;
