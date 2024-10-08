import { useState, useEffect, useCallback } from "react";
import lotApi from "../config/lotApi";
import { message } from "antd";

// Custom hook to fetch lots data
const useFetchLots = (lotStatusId) => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi nếu có

  const fetchLots = useCallback(async () => {
    try {
      setLoading(true); // Bắt đầu loading khi fetch dữ liệu
      const response = await lotApi.get(`lots?LotStatusId=${lotStatusId}`);
      const fetchedLots = response.data;
      setLots(fetchedLots); // Cập nhật state lots với dữ liệu từ API
      setLoading(false); // Kết thúc loading
    } catch (error) {
      setError(error);
      message.error(error.message); // Hiển thị thông báo lỗi
      setLoading(false); // Kết thúc loading ngay cả khi lỗi xảy ra
    }
  }, [lotStatusId]);

  useEffect(() => {
    if (lotStatusId) {
      fetchLots(); // Gọi API khi lotStatusId thay đổi
    }
  }, [lotStatusId, fetchLots]);

  return { lots, loading, error, refetch: fetchLots };
};

export default useFetchLots;
