import { Badge, Button, Card, Col, Descriptions, Image, Row } from "antd";
import React, { useState } from "react";
import SendEmailModal from "../mail-modal";
import RejectModal from "../reject-modal";

function UserDetailCard({
  data,
  loading,
  openModal,
  isRequesting,
  onApprove,
  onReject,
  address,
}) {
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => window.history.back()}>
        Back
      </Button>

      <Card
        className="user-detail-card"
        loading={loading}
        title={
          <span style={{ fontWeight: "600", fontSize: "2em" }}>
            {data.UserRoleId === 2 ? data.FarmName : data.Username}
          </span>
        }
        style={{
          maxWidth: 800,
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data.UserRoleId === 2 && <Image src={data.Certificate} width={"50em"} />}
        <Descriptions bordered column={1} style={{ width: "50em" }}>
          {data.UserRoleId === 2 && (
            <Descriptions.Item label="Farm Name">{data.FarmName}</Descriptions.Item>
          )}
          <Descriptions.Item label="User ID">{data.UserId}</Descriptions.Item>
          <Descriptions.Item label="Username">{data.Username}</Descriptions.Item>
          <Descriptions.Item label="First Name">{data.FirstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{data.LastName}</Descriptions.Item>
          <Descriptions.Item label="Email">{data.Email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{data.Phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{address}</Descriptions.Item>
          {isRequesting === 1 && (
            <Descriptions.Item label="Active">
              <Badge
                status={data.Active ? "success" : "error"}
                text={data.Active ? "Active" : "Inactive"}
              />
            </Descriptions.Item>
          )}
          {data.UserRoleId === 2 && (
            <Descriptions.Item label="About">{data.About}</Descriptions.Item>
          )}
        </Descriptions>

        <Row gutter={24} style={{ marginTop: 20 }}>
          {isRequesting !== 2 && (
            <Col span={6}>
              <Button style={{color: "green"}} onClick={openModal}>
                Update
              </Button>
            </Col>
          )}
          {isRequesting === 0 && (
            <>
              <Col span={6}>
                <Button style={{backgroundColor: "green"}} type="primary" onClick={onApprove}>
                  Approve
                </Button>
              </Col>
              <Col span={6}>
                <Button type="primary" danger onClick={() => setRejectModalVisible(true)}>
                  Reject
                </Button>
              </Col>
            </>
          )}
          <Col span={6}>
            <Button style={{color: "green"}} onClick={() => setEmailModalVisible(true)}>
              Send Mail
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Modals */}
      <SendEmailModal
        email={data.Email}
        visible={isEmailModalVisible}
        onClose={() => setEmailModalVisible(false)}
      />
      <RejectModal
        userId={data.UserId}
        email={data.Email}
        visible={isRejectModalVisible}
        onClose={() => setRejectModalVisible(false)}
        onReject={onReject}
      />
    </>
  );
}

export default UserDetailCard;
