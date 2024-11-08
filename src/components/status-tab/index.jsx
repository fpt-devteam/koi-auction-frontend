import { useState, useEffect } from "react";
import { Tabs, Spin, message } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import lotApi from "../../config/lotApi";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";

const StatusTab = ({ LotList }) => {
  const [tabsData, setTabsData] = useState([]); // Lưu trữ danh sách tab từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [activeTab, setActiveTab] = useState("1"); // Tab đang được chọn
  const dispatch = useDispatch(); // Sử dụng dispatch từ Redux
  const { user } = useSelector((store) => store.user); // Lấy user từ Redux
  const breederId = user.UserRoleId == 2 ? user.UserId : null;

  // Gọi API để lấy danh sách tab
  const fetchTabsData = async () => {
    if (tabsData.length == 0) {
      // Nếu đã có dữ liệu thì không cần fetch lại
      try {
        const response = await lotApi.get("lot-statuses");
        const data = response.data;
        setTabsData(data); // Cập nhật danh sách tab
        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        message.error(error.message); // Hiển thị thông báo lỗi nếu gọi API thất bại
        setLoading(false);
      }
    }
  };

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    fetchTabsData();
  }, []);

  // Xử lý sự kiện khi chọn tab
  const handleTabChange = (key) => {
    dispatch(setStatusId(key));
    console.log("tab key", key);
    setActiveTab(key);
  };

  // Render UI cho các tab
  const items = tabsData.map((tab) => ({
    key: String(tab.lotStatusId),
    label: tab.lotStatusName || `Tab ${tab.lotStatusId + 1}`,
    icon: tab.lotStatusId % 2 === 0 ? <AppleOutlined /> : <AndroidOutlined />,
  }));

  if (user == null) {
    <Spin />; // Nếu không có breederId thì không hiển thị tab
  }

  return loading ? (
    <Spin /> // Hiển thị vòng quay loading khi đang tải dữ liệu
  ) : (
    <>
      <Tabs
        defaultActiveKey="{activeTab}"
        onChange={handleTabChange}
        items={items}
      />
      <LotList lotStatusId={activeTab} breederId={breederId} />,
    </>
  );
};

export default StatusTab;
