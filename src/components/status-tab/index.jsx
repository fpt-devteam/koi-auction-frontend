import { useState, useEffect } from "react";
import { Tabs, Spin, message } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import lotApi from "../../config/lotApi";

const StatusTab = ({ LotList }) => {
  const [tabsData, setTabsData] = useState([]); // Lưu trữ danh sách tab từ API
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [activeTab, setActiveTab] = useState("1"); // Tab đang được chọn

  // Gọi API để lấy danh sách tab
  const fetchTabsData = async () => {
    try {
      const response = await lotApi.get("lot-statuses");
      const data = response.data;
      setTabsData(data); // Cập nhật danh sách tab
      setLoading(false); // Tắt trạng thái loading
    } catch (error) {
      message.error(error.message); // Hiển thị thông báo lỗi nếu gọi API thất bại
      setLoading(false);
    }
  };

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    fetchTabsData();
  }, []);

  // Xử lý sự kiện khi chọn tab
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Render UI cho các tab
  const items = tabsData.map((tab) => ({
    key: String(tab.lotStatusId),
    label: tab.lotStatusName || `Tab ${tab.lotStatusId + 1}`,
    children: <LotList lotStatusId={activeTab} />, // Render LotList như một JSX component
    icon: tab.lotStatusId % 2 === 0 ? <AppleOutlined /> : <AndroidOutlined />,
  }));

  return loading ? (
    <Spin /> // Hiển thị vòng quay loading khi đang tải dữ liệu
  ) : (
    <Tabs
      defaultActiveKey="{activeTab}"
      onChange={handleTabChange}
      items={items}
    />
  );
};

export default StatusTab;
