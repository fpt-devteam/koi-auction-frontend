import React from "react";
import { Card, Button, Row, Col } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BreederLotCard = ({ lot }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/auction-lot-detail/${lot.lotId}`);
  };

  return (
    <Card
      style={{
        border: "2px solid #d9d9d9",
        marginBottom: "20px",
        //shadow
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        //background color
        backgroundColor: "#fafafa",
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <img
            src={lot.koiMedia[0].filePath || "default-placeholder.png"}
            alt="Koi Fish"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </Col>
        <Col span={18}>
          <h2 style={{ color: "#6577F3", padding: "2%" }}>{lot.sku}</h2>
          <hr></hr>
          <h3 style={{ paddingTop: "2%" }}>
            {lot.variety || "Unknown Variety"}
          </h3>
          <p>
            {`Size: ${lot.sizeCm} cm | Year of Birth: ${
              lot.yearOfBirth
            } | Weight: ${lot.weightKg} kg | Sex: ${
              lot.sex ? "Female" : "Male"
            }`}
          </p>
          <h2 style={{ color: "#c00" }}>
            {lot.finalPrice == 0
              ? `No bids`
              : ` ${lot.finalPrice.toLocaleString()} VND`}
          </h2>
          <div>
            <Button
              icon={<PictureOutlined />}
              style={{ marginRight: "8px" }}
              onClick={handleViewClick}
            >
              View
            </Button>
            {/* <Button icon={<YoutubeOutlined />}>Movie</Button> */}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default BreederLotCard;
