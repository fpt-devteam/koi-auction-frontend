import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const SuggestLogin = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9", // Màu nền xám nhạt
        padding: "10px 10px", // Giảm kích thước padding
        textAlign: "center", // Căn giữa nội dung
        borderRadius: "8px", // Bo góc mềm mại
        marginTop: "10px", // Khoảng cách dưới
      }}
    >
      <Text
        strong
        style={{
          fontSize: "14.4px", // Giảm font-size 20% so với 18px
          display: "block",
          marginBottom: "16px",
        }}
      >
        Register today to start bidding!
      </Text>
      <Row
        justify="center"
        gutter={[12, 12]} // Thêm khoảng cách giữa các nút cho responsive
      >
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button
            type="primary"
            onClick={() => navigate("/register")}
            style={{
              backgroundColor: "#d9534f", // Màu đỏ của nút Register
              borderColor: "#d9534f", // Màu viền của nút Register
              width: "100%", // Chiều rộng nút linh hoạt theo cột
              height: "32px", // Giảm chiều cao nút
              fontSize: "14px", // Giảm kích thước chữ trong nút
            }}
          >
            Register
          </Button>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Button
            type="primary"
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#337ab7", // Màu xanh của nút Login
              borderColor: "#337ab7", // Màu viền của nút Login
              width: "100%", // Chiều rộng nút linh hoạt theo cột
              height: "32px", // Giảm chiều cao nút
              fontSize: "14px", // Giảm kích thước chữ trong nút
            }}
          >
            Log In
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuggestLogin;
