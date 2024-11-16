import { useEffect, useState } from "react";
import { Tabs, Spin, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setStatusId } from "../../redux/features/statusSlice";
import { useNavigate, useParams } from "react-router-dom";
import useFetchLots from '../../hooks/useFetchLots';
import lotApi from "../../config/lotApi";

const staticTabsData = [
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
  const [loading, setLoading] = useState(true); // Lưu trữ danh sách tab từ API
  const [activeTab, setActiveTab] = useState("1"); // Tab đang được chọn
  const dispatch = useDispatch(); // Sử dụng dispatch từ Redux
  const { user } = useSelector((store) => store.user); // Lấy user từ Redux
  const breederId = user.UserRoleId == 2 ? user.UserId : null;
  const [lotList, setLotList] = useState([]);
  const navigate = useNavigate();
  let { LotStatusId } = useParams();

  useEffect(() => {
    setActiveTab(LotStatusId);
    setLoading(true);
    async function fetchLotDataByStatus() {
      try {
        if (LotStatusId <= 5) {
          await Promise.all([
            await lotApi.get("/lots", {
              params: {
                BreederId: breederId,
                LotStatusId: LotStatusId,
              }
            })
          ]).then(([lotResponse]) => {
            setLotList(lotResponse?.data);
          });
        } else {
          await Promise.all([
            await lotApi.get("/sold-lots", {
              params: {
                BreederId: breederId,
                LotStatusId: LotStatusId,
              }
            })
          ]).then(([soldLotResponse]) => {
            const soldLotList = soldLotResponse?.data?.map((soldLot) => ({
              lotDto: {
                lotId: soldLot?.soldLotId,
                sku: soldLot?.sku,
                koiFishDto: soldLot?.koiFish,
              },
              lotStatusDto: soldLot?.lotStatus,
              breederDetailDto: soldLot?.breederDetailDto,
              address: soldLot?.address,
              winnerDto: soldLot?.winnerDto,
              finalPrice: soldLot?.finalPrice,
              auctionDeposit: soldLot?.auctionDepositDto?.amount,
              createdAt: soldLot?.createdAt,
              updatedAt: soldLot?.updatedAt,
              expTime: soldLot?.expTime
            }));
            setLotList(soldLotList);
            console.log("soldLotLishadfdst", soldLotList);
          })
        }
      } catch (error) {
        message.error(error.message);
      }
      setLoading(false);
    };
    fetchLotDataByStatus();
  }, [LotStatusId]);

  const handleTabChange = (key) => {
    navigate(`/management/lots/${key}`);
  };

  if (user == null) {
    <Spin />; // Nếu không có breederId thì không hiển thị tab
  }

  return loading ? (
    <Spin /> // Hiển thị vòng quay loading khi đang tải dữ liệu
  ) : (
    <>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={handleTabChange}
        type="card"
        items={staticTabsData.map((tab) => ({
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
            <LotList breederId={breederId} tabData={tab} lotList={lotList} refetch={() => { }} />
          ),
        }))}
      />
    </>
  );
};

export default StatusTab;
