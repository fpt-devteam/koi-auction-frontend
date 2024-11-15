import { useState } from "react";
import { Tabs, Spin, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";

const tabsData = [
  { lotStatusId: 1, lotStatusName: "Pending", lotStatusIconLink: "src/assets/icon/pending.png" },
  { lotStatusId: 2, lotStatusName: "Approved", lotStatusIconLink: "src/assets/icon/accept.png" },
  { lotStatusId: 3, lotStatusName: "Rejected", lotStatusIconLink: "src/assets/icon/rejected.png" },
  { lotStatusId: 4, lotStatusName: "In Auction", lotStatusIconLink: "src/assets/icon/auction.png" },
  { lotStatusId: 5, lotStatusName: "Unsold", lotStatusIconLink: "src/assets/icon/banned.png" },
  { lotStatusId: 6, lotStatusName: "To Pay", lotStatusIconLink: "src/assets/icon/payment-method.png" },
  { lotStatusId: 7, lotStatusName: "To Ship", lotStatusIconLink: "src/assets/icon/shipping.png" },
  { lotStatusId: 8, lotStatusName: "To Receive", lotStatusIconLink: "src/assets/icon/receiver.png" },
  { lotStatusId: 9, lotStatusName: "Completed", lotStatusIconLink: "src/assets/icon/completed.png" },
  { lotStatusId: 10, lotStatusName: "Canceled", lotStatusIconLink: "src/assets/icon/cancel.png" },
  { lotStatusId: 11, lotStatusName: "Payment Overdue", lotStatusIconLink: "src/assets/icon/cancel.png" },
];

const StatusTab = ({ LotList }) => {
  const [loading, setLoading] = useState(false); // Lưu trữ danh sách tab từ API
  const [activeTab, setActiveTab] = useState("1"); // Tab đang được chọn
  const dispatch = useDispatch(); // Sử dụng dispatch từ Redux
  const { user } = useSelector((store) => store.user); // Lấy user từ Redux
  const breederId = user.UserRoleId == 2 ? user.UserId : null;

  const handleTabChange = (key) => {
    dispatch(setStatusId(key));
    console.log("tab key", key);
    setActiveTab(key);
  };

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
        type="card"
        items={tabsData.map((tab) => ({
          key: String(tab.lotStatusId),
          label:
            <div
              className="tab-name-with-icon"
            >
              <Image
                width={24} height={24} preview={false} src={tab.lotStatusIconLink}>
              </Image>
              <span className="tab-name">{tab.lotStatusName}</span>
            </div>,
          children: (
            <LotList breederId={breederId} tabData={tab} />
          ),
        }))}
      />
    </>
  );
};

export default StatusTab;
