import React, { useState } from "react";
import { Modal, Button, Input, Space } from "antd";

const { TextArea } = Input;

function BreederRequestModal({userId, email, visible, onClose, onConfirm, status }) {
  const [actionType, setActionType] = useState(null); // "approve" or "reject"
  const [reason, setReason] = useState(""); // Reason for rejection

  const handleApprove = () => {
    setActionType("approve");
    onConfirm(); // Approve with no reason
  };

  const handleReject = () => {
    setActionType("reject");
  };

  const handleRejectConfirm = () => {
    if (!reason.trim()) {
      return alert("Please provide a reason for rejection.");
    }
    onConfirm(); // Confirm rejection with reason
    setReason(""); // Reset reason
    onClose(); // Close modal
  };

  return (
    <Modal
      title="Confirm Breeder Request"
      open={visible}
      onCancel={onClose}
      footer={null} // Custom footer for actions
    >
      {status == 1 && (
        <>
          <p>Are you sure you want to proceed with this action?</p>
          <Space>
            <Button type="primary" onClick={handleApprove}>
              Approve
            </Button>
            <Button type="danger" onClick={onClose}>
              No
            </Button>
          </Space>
        </>
      )}

      {status == 2 && (
        <>
          <p>Please provide a reason for rejecting the request:</p>
          <TextArea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter rejection reason"
          />
          <Space style={{ marginTop: 16 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" danger onClick={handleRejectConfirm}>
              Confirm Rejection
            </Button>
          </Space>
        </>
      )}
    </Modal>
  );
}

export default BreederRequestModal;
