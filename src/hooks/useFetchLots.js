import { useState, useEffect, useCallback } from "react";
import lotApi from "../config/lotApi";
import { message } from "antd";
import debounce from "lodash.debounce";

// Custom hook to fetch lots data
const useFetchLots = (
  lotStatusId,
  sortBy = "UpdatedAt",
  isDescending = false,
  breederId = null
) => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi nếu có

  const fetchLots = useCallback(async () => {
    try {
      const url =
        breederId == 2
          ? `lots?LotStatusId=${lotStatusId}&SortBy=${sortBy}&IsDescending=${isDescending}&BreederId=${breederId}`
          : `lots?LotStatusId=${lotStatusId}&SortBy=${sortBy}&IsDescending=${isDescending}`;
      setLoading(true); // Bắt đầu loading khi fetch dữ liệu
      const response = await lotApi.get(url);
      const fetchedLots = response.data;
      setLots(fetchedLots); // Cập nhật state lots với dữ liệu từ API
      setLoading(false); // Kết thúc loading
    } catch (error) {
      setError(error);
      message.error(error.message); // Hiển thị thông báo lỗi
      setLoading(false); // Kết thúc loading ngay cả khi lỗi xảy ra
    }
  }, [lotStatusId]);

  const debouncedFetchLots = useCallback(debounce(fetchLots, 100), [fetchLots]);

  // useEffect(() => {
  //   if (lotStatusId) {
  //     fetchLots(); // Gọi API khi lotStatusId thay đổi
  //   }
  // }, [lotStatusId, fetchLots]);
  useEffect(() => {
    if (lotStatusId) {
      debouncedFetchLots(); // Gọi API khi lotStatusId thay đổi, nhưng đã được debounce
    }
    // Cleanup debounce khi component unmount
    return () => {
      debouncedFetchLots.cancel();
    };
  }, [lotStatusId, debouncedFetchLots]);

  return { lots, loading, error, refetch: fetchLots };
};

export default useFetchLots;
