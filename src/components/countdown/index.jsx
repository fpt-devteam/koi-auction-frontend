import { Statistic, Row, Col, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
const { Text } = Typography;

const Countdown = ({ startTime, endTime, statusName }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  useEffect(() => {
    if (statusName == "Upcoming") {
      setRemainingTime(startTime);
    } else if (statusName == "Ongoing") {
      setRemainingTime(endTime);
    }
  }, [startTime, endTime, statusName]);

  return (
    <div
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "12px",
        padding: "5px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        marginBottom: "20px",
        minHeight: "120px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Text
        strong
        style={{
          fontSize: "1.5rem",
          color:
            statusName == "Upcoming"
              ? "#0958D9"
              : statusName == "Ongoing"
              ? "green"
              : "red",
        }}
      >
        {statusName === "Upcoming" && startTime == null && "Upcoming"}
        {statusName === "Upcoming" && startTime != null && "Starting in:"}
        {statusName === "Ongoing" && "Time Left:"}
        {statusName === "Ended" &&
          `Ended at ${new Date(endTime).toLocaleString()}`}
      </Text>

      {(statusName === "Upcoming" || statusName === "Ongoing") &&
        remainingTime && (
          <Statistic.Countdown
            value={remainingTime}
            format="HH:mm:ss"
            valueStyle={{
              fontSize: "2.5rem",
            }}
          />
        )}
    </div>
  );
};

export default Countdown;
