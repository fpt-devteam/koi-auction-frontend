// src/components LotList.js
import { Row, Col, Spin, message } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import LotCard from "../lot-card";
import lotApi from "../../config/lotApi";

// eslint-disable-next-line react/prop-types
const LotList = ({ lotStatusId }) => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading

  const fetchLots = async () => {
    try {
      const response = await lotApi.get(`lots?LotStatusId=${lotStatusId}`);
      // console.log(response);

      const fetchedLots = response.data.$values;
      // console.log("Fetched lots with IDs: ", fetchedLots);
      setLots(fetchedLots);
      setLoading(false);
    } catch (error) {
      // console.log("Failed to fetch lots: ", error);
      message.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lotStatusId) {
      // Chỉ fetch khi lotStatusId được truyền vào
      fetchLots();
    }
  }, [lotStatusId]); // Cập nhật mỗi khi lotStatusId thay đổi

  // Hàm để gọi lại fetchLots sau khi xóa lot
  const handleLotDelete = async () => {
    setLoading(true);
    await fetchLots(); // Gọi lại API để cập nhật danh sách sau khi xóa
  };
  return loading ? (
    <Spin />
  ) : (
    <div
      className="lot-list"
      style={{
        marginBottom: "20px",
      }}
    >
      <Row gutter={[16, 16]}>
        {lots.map((lot) => (
          <Col key={lot.lotId} xs={24} sm={24} md={24} lg={24}>
            <LotCard lot={lot} onLotDelete={handleLotDelete} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LotList;
