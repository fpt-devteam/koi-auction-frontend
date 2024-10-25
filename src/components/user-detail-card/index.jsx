import { Badge, Button, Card, Descriptions } from 'antd'
import React from 'react'

function UserDetailCard({
  data,
  loading,
  openModal,
  title,
}) {
  return (
    <>
      <Button type='primary' onClick={() => window.history.back()}>Back</Button>

      <Card
        className="user-detail-card"
        loading={loading}
        title={<span style={{ fontWeight: "600", fontSize: "2em" }}>{title}</span>}
        style={{ maxWidth: 800, margin: "20px auto", display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Descriptions bordered column={1} style={{ width: "50em" }}>
          <Descriptions.Item label="User ID">{data.UserId}</Descriptions.Item>
          <Descriptions.Item label="Username">{data.Username}</Descriptions.Item>
          <Descriptions.Item label="First Name">
            {data.FirstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {data.LastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{data.Email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{data.Phone}</Descriptions.Item>
          <Descriptions.Item label="Active">
            <Badge
              status={data.Active ? "success" : "error"}
              text={data.Active ? "Active" : "Inactive"}
            />
          </Descriptions.Item>
          {data.UserRoleId === 2 && (
            <>
              <Descriptions.Item label="Farm Name">{data.FarmName}</Descriptions.Item>
              <Descriptions.Item label="Certificate">{data.Certificate}</Descriptions.Item>
              <Descriptions.Item label="About">{data.About}</Descriptions.Item>
            </>
          )}
        </Descriptions>
        <Button type="primary" className="update-button" onClick={openModal} style={{ marginTop: "20px" }}>
          Update
        </Button>
      </Card >
    </>
  )
}

export default UserDetailCard