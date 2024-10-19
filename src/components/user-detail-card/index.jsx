import { Badge, Button, Card, Descriptions } from 'antd'
import { SpaceContext } from 'antd/es/space'
import React from 'react'

function UserDetailCard({
  data,
  loading,
  openModal,
  title,
}) {
  return (
    <Card
      className="user-detail-card"
      loading={loading}
      title={<span style={{ fontWeight: "600", fontSize: "2em"}}>{title}</span>}
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
        <Descriptions.Item label="User Role ID">
          {data.UserRoleId}
        </Descriptions.Item>
        <Descriptions.Item label="Balance">
          ${data.Balance.toFixed(2)}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" className="update-button" onClick={openModal} style={{ marginTop: "20px" }}>
        Update
      </Button>
    </Card>
  )
}

export default UserDetailCard