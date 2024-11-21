import { useEffect, useState } from "react";
import { Tabs, Spin, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetchLots from "../../hooks/useFetchLots";
import lotApi from "../../config/lotApi";
import userApi from "../../config/userApi";

const staticTabsData = [
  { lotStatusId: 1, lotStatusName: "Pending", lotStatusIconLink: "/src/assets/icon/pending.png" },
  { lotStatusId: 2, lotStatusName: "Approved", lotStatusIconLink: "/src/assets/icon/accept.png" },
  { lotStatusId: 3, lotStatusName: "Rejected", lotStatusIconLink: "/src/assets/icon/rejected.png" },
  { lotStatusId: 4, lotStatusName: "In Auction", lotStatusIconLink: "/src/assets/icon/auction.png" },
  { lotStatusId: 5, lotStatusName: "Unsold", lotStatusIconLink: "/src/assets/icon/banned.png" },
  { lotStatusId: 6, lotStatusName: "To Pay", lotStatusIconLink: "/src/assets/icon/payment-method.png" },
  { lotStatusId: 7, lotStatusName: "To Ship", lotStatusIconLink: "/src/assets/icon/shipping.png" },
  { lotStatusId: 8, lotStatusName: "To Receive", lotStatusIconLink: "/src/assets/icon/receiver.png" },
  { lotStatusId: 9, lotStatusName: "Completed", lotStatusIconLink: "/src/assets/icon/completed.png" },
  { lotStatusId: 10, lotStatusName: "Canceled", lotStatusIconLink: "/src/assets/icon/cancel.png" },
  { lotStatusId: 11, lotStatusName: "Payment Overdue", lotStatusIconLink: "/src/assets/icon/cancel.png" },
];

const StatusTab = ({ LotList }) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [activeTab, setActiveTab] = useState("1"); // Active tab state
  const [lotList, setLotList] = useState([]); // List of lots
  const [seed, setSeed] = useState(1); // For refetching data
  const dispatch = useDispatch(); // Redux dispatch
  const { user } = useSelector((store) => store.user); // Redux state for user
  const navigate = useNavigate();
  const { LotStatusId } = useParams(); // Get `LotStatusId` from URL params

  const breederId = user?.UserRoleId === 2 ? user.UserId : null; // Breeder ID based on user role

  const handleReset = () => setSeed(seed + 1); // Trigger re-fetch

  useEffect(() => {
    setActiveTab(LotStatusId || "1");
    setLoading(true);

    const fetchLotDataByStatus = async () => {
      try {
        let response;
        if (!LotStatusId || LotStatusId <= 5) {
          response = await lotApi.get("/lots", {
            params: {
              BreederId: breederId,
              LotStatusId: LotStatusId || 1,
            },
          });
          setLotList(response.data || []);
        } else {
          const [soldLotResponse, addressResponse] = await Promise.all([
            lotApi.get("/sold-lots", {
              params: {
                BreederId: breederId,
                LotStatusId: LotStatusId || 6,
              },
            }),
            userApi.get("/manage/profile/address"),
          ]);
          const soldLotList = soldLotResponse?.data?.reverse().map((soldLot) => ({
            lotDto: {
              lotId: soldLot?.soldLotId,
              sku: soldLot?.sku,
              koiFishDto: soldLot?.koiFish,
            },
            lotStatusDto: soldLot?.lotStatus,
            address: soldLot?.address,
            winnerDto: soldLot?.winnerDto,
            finalPrice: soldLot?.finalPrice,
            auctionDeposit: soldLot?.auctionDepositDto?.amount,
            createdAt: soldLot?.createdAt,
            updatedAt: soldLot?.updatedAt,
            updatedLot: soldLot?.updatedLot,
            expTime: soldLot?.expTime,
            breederDetailDto: {
              ...soldLot.breederDetailDto,
              farmAddress: addressResponse.data.find((add) => add.UserId == soldLot.breederId).Address || "Unknown",
            },
          }));
          setLotList(soldLotList);
        }
      } catch (error) {
        message.error(error.message);
      }
      setLoading(false);
    };

    fetchLotDataByStatus();
  }, [LotStatusId, seed, breederId]);

  const handleTabChange = (key) => {
    navigate(`/management/lots/${key}`);
  };

  if (!user) {
    return <Spin />; // Show spinner if user is not loaded
  }

  return loading ? (
    <Spin /> // Show spinner while loading
  ) : (
    <Tabs
      activeKey={activeTab}
      onChange={handleTabChange}
      type="card"
    >
      {staticTabsData.map((tab) => (
        <Tabs.TabPane
          key={String(tab.lotStatusId)}
          tab={
            <div className="tab-name-with-icon">
              <Image width={24} height={24} preview={false} src={tab.lotStatusIconLink} />
              <span className="tab-name">{tab.lotStatusName}</span>
            </div>
          }
        >
          <LotList breederId={breederId} tabData={tab} lotList={lotList} refetch={handleReset} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default StatusTab;
