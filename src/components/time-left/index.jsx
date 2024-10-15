import { Statistic, Row, Col, Typography } from "antd";
import { useEffect, useState } from "react";
const { Text } = Typography;

const TimeLeft = ({ duration }) => {
  const [endTime, setEndTime] = useState(null);

  // Chuyển chuỗi duration (HH:mm:ss) thành milliseconds
  const convertDurationToMilliseconds = (duration) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  useEffect(() => {
    const durationMilliseconds = convertDurationToMilliseconds(duration);
    const endTime = Date.now() + durationMilliseconds; // Tính toán thời gian kết thúc
    setEndTime(endTime);
  }, [duration]);

  return (
    <>
      <Text strong style={{ fontSize: "1.2rem" }}>
        Time left
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Căn giữa theo chiều ngang
          alignItems: "center", // Căn giữa theo chiều dọc
          height: "70%", // Đảm bảo chiếm toàn bộ chiều cao container nếu cần
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            {endTime && (
              <Statistic.Countdown
                value={endTime} // Hiển thị đồng hồ đếm ngược với thời gian kết thúc
                format="HH:mm:ss"
                valueStyle={{
                  fontSize: "3rem", // Tăng kích thước số đếm ngược
                  textAlign: "center", // Căn giữa các số
                  //   fontWeight: "bold", // Làm cho số đậm hơn
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TimeLeft;
