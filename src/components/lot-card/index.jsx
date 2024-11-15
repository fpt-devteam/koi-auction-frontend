import {
  Button,
  Card,
  Col,
  Image,
  message,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import LotDetailPage from "../../pages/lot-detail-page";
import lotApi from "../../config/lotApi";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import soldLotApi from "../../config/soldLotApi";
const { Text } = Typography;
import TextArea from "antd/es/input/TextArea";
import userApi from "../../config/userApi";
import paymentApi from "../../config/paymentApi";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};
const formartMoney = (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const soldLotDataMock = {
  lotDto: {
    lotId: 56,
    sku: "BRD17-204237-10112024",
    startingPrice: 200000.00,
    createdAt: "2024-11-11T03:42:38.163",
    auctionMethod: {
      auctionMethodId: 3,
      auctionMethodName: "Ascending-Bid Auction",
      description: null
    },
    breederId: 17,
    koiFishDto: {
      variety: "Chagoi",
      sex: false,
      sizeCm: 17.00,
      yearOfBirth: 2004,
      weightKg: 17.00,
      koiMedia: [
        {
          koiMediaId: 58,
          koiFishId: 56,
          filePath: "https://firebasestorage.googleapis.com/v0/b/koiauction-59dc0.appspot.com/o/010604_hallOfFame_5%2520Kokugyo%252025%2520Bu%25203%252025BU%2520%2528MR.PRUK%2520VANNAPRUK%2529-ISA%2520231224%2520SHOWA%2520IS45%25201Y%252025CM%25282024-06%2529%2528IV6612-199%2529%252824%2529.JPG?alt=media&token=67a9d26e-79e5-46c6-845e-bc014e1f897d"
        }
      ]
    },
    lotStatusDto: {
      lotStatusId: 6,
      lotStatusName: "To Pay"
    },
    breederDetailDto: {
      breederId: 17,
      farmName: "Isa Koi Farm"
    }
  },
  winnerDto: {
    UserId: 19,
    Phone: "0959292925",
    Email: "vintdse181505@fpt.edu.vn",
    FirstName: "Nguyen Thi Dieu Vi",
    LastName: "(K18 HCM)",
    Address: "Address + Ward + District + Province",
  },
  finalPrice: 2400000.00,
  deposit: "",
  createdAt: "2024-11-11T04:01:13.18",
  updatedAt: "2024-11-13T15:58:33.967",
};

// const LotCard = ({ lotStatusId, lot, refetch }) => {
//   const userRoleId = useSelector((store) => store.user.user?.UserRoleId);

//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [finalPrice, setFinalPrice] = useState(null);
//   const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
//   const [cancelReason, setCancelReason] = useState("");
//   const [winnerId, setWinnerId] = useState(null);

//   const handleLotCancel = () => {
//     setIsCancelModalOpen(true);
//   };
//   const handleLotDeliveryOpen = () => {
//     setDeliveryModalVisible(true);
//   };
//   const handleLotDeliveryClose = () => {
//     setDeliveryModalVisible(false);
//   };
//   const handleLotComplete = () => {
//     handleComplete();
//   };
//   useEffect(() => {
//     if (lotStatusId > 5) {
//       const fetchSoldLot = async () => {
//         try {
//           const response = await soldLotApi.get(`${lot.lotId}`);
//           setWinnerId(response?.data?.winnerId);
//           setFinalPrice(response?.data?.finalPrice);
//           console.log("response", response.data);
//         } catch (error) {
//           console.log("error", error);
//         }
//       };
//       fetchSoldLot();
//     }
//   }, [lot, lotStatusId]);
//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleModalCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = async () => {
//     try {
//       await lotApi.put(`lots/${lot.lotId}/status`, {
//         lotStatusName: "Canceled",
//         description: cancelReason,
//       });
//       message.success("Canceled successfully!");
//       refetch();
//     } catch (error) {
//       message.error("Failed to cancel lot: " + error.message);
//     }
//   };
//   const handleLotDelete = async () => {
//     try {
//       await lotApi.delete(`lots/${lot.lotId}`);
//       message.success("Deleted successfully!");
//       refetch();
//     } catch (error) {
//       message.error("Failed to delete lot: " + error.message);
//     }
//   };
//   const statusId = useSelector((state) => state.status.statusId);

//   const handleComplete = async () => {
//     try {
//       console.log(lot);
//       await Promise.all([
//         lotApi.put(`lots/${lot.lotId}/status`, {
//           lotStatusName: "Completed",
//         }),
//         paymentApi.post(`payout`, {
//           Amount: finalPrice,
//           BreederId: lot.breederId,
//         }),
//       ]).then(([response, paymentResponse]) => {
//         console.log("response", response.data);
//         console.log("paymentResponse", paymentResponse.data);
//         // message.success('Completed successfully!');
//       });
//       refetch();
//     } catch (error) {
//       message.error("Failed to complete lot: " + error.message);
//     }
//   };

//   return (
//     <>
//       <Card
//         style={{
//           //shadow
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           //background color
//           backgroundColor: "#fafafa",
//         }}
//         title={
//           <div
//             style={{ textAlign: "left" }}
//           >{`${lot.koiFishDto.variety} #${lot.sku}`}</div>
//         }

//       >
//         <Row gutter={[16, 16]}>
//           <Col
//             xs={4}
//             sm={4}
//             md={4}
//             lg={4}
//             xl={4}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Image
//               src={
//                 lot.koiFishDto.koiMedia?.[0]?.filePath ||
//                 "default-placeholder.png"
//               }
//               width={80}
//               height={80}
//             />
//           </Col>

//           {/* Details Section */}
//           <Col xs={8} sm={8} md={8} lg={8} xl={8}>
//             <Text strong>Starting Price: </Text>
//             <span>{lot.startingPrice || "..."}</span>
//             <br />

//             <Text strong>Varitey: </Text>
//             <span>{lot.koiFishDto.variety || "..."}</span>
//             <br />

//             <Text strong>Method: </Text>
//             <span>{lot.auctionMethod.auctionMethodName || "..."}</span>
//             <br />

//             {userRoleId > 2 && (
//               <>
//                 <Text strong>By: </Text>
//                 <span>{lot.breederDetailDto?.farmName || "Unknown"}</span>
//                 <br />
//               </>
//             )}
//           </Col>
//           <Col xs={4} sm={4} md={4} lg={4} xl={4}>
//             {userRoleId > 2 && finalPrice && lotStatusId > 5 && (
//               <>
//                 <span
//                   style={{
//                     color: "red",
//                     fontWeight: "bold",
//                     marginLeft: "5px",
//                   }}
//                 >
//                   {finalPrice?.toLocaleString() || "..."} VND
//                 </span>
//               </>
//             )}
//           </Col>
//           {/* View Button */}
//           <Col
//             xs={4}
//             sm={4}
//             md={4}
//             lg={4}
//             xl={4}
//             style={{
//               display: "flex",
//               justifyContent: "space-around",
//               alignItems: "center",
//             }}
//           >
//             <div style={{ display: "flex", gap: "10px" }}>
//               <Button
//                 type="primary"
//                 shape="round"
//                 size="large"
//                 onClick={showModal}
//               >
//                 Detail
//               </Button>
//               {userRoleId > 2 && lotStatusId == 6 && (
//                 <>
//                   <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     onClick={handleLotDeliveryOpen}
//                   >
//                     Delivery
//                   </Button>
//                   <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     onClick={handleLotCancel}
//                     danger
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               )}
//               {userRoleId > 2 && lotStatusId == 7 && (
//                 <>
//                   <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     onClick={handleLotComplete}
//                   >
//                     Complete
//                   </Button>
//                   <Button
//                     type="primary"
//                     shape="round"
//                     size="large"
//                     onClick={handleLotCancel}
//                     danger
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               )}
//             </div>

//             {/* Nút Delete với Popconfirm để xác nhận xóa */}
//             {userRoleId === 2 && lotStatusId < 3 && (
//               <Popconfirm
//                 title="Are you sure to delete this item?"
//                 onConfirm={handleLotDelete}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <Button
//                   type="primary"
//                   danger
//                   shape="circle"
//                   icon={<DeleteOutlined />}
//                 />
//               </Popconfirm>
//             )}
//           </Col>
//         </Row>
//       </Card>
//       {/* Modal hiển thị trang UpdateLotPage */}
//       <Modal
//         open={isModalVisible}
//         onCancel={handleModalCancel}
//         footer={null} // Bỏ footer để tùy chỉnh nút trong trang UpdateLotPage
//         width={1200} // Đặt chiều rộng modal tùy ý
//       >
//         {/* Render trang UpdateLotPage */}
//         <h1>heheeh</h1>
//         <LotDetailPage
//           lotData={lot}
//           refetch={refetch}
//           handleModalCancel={handleModalCancel}
//         />
//       </Modal>
//       <Modal
//         open={deliveryModalVisible}
//         onCancel={handleLotDeliveryClose}
//         footer={null}
//         width={1200}
//         style={{ top: 0 }}
//       >
//         <DeliveryModal
//           lotInfoData={lot}
//           refresh={refetch}
//           winnerId={winnerId}
//         />
//       </Modal>
//       <Modal
//         title="Cancel Lot" 
//         open={isCancelModalOpen}
//         onCancel={() => {
//           setIsCancelModalOpen(false);
//         }}
//         onOk={handleCancel}
//       >
//         <TextArea
//           placeholder="Reason"
//           value={cancelReason}
//           onChange={(e) => setCancelReason(e.target.value)}
//         />
//       </Modal>
//     </>
//   );
// };
const LotCard = ({ tabData, lot, refetch, userRoleId }) => {
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isDeliveryModalVisible, setIsDeliveryModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isViewOrderModalVisible, setIsViewOrderModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");


  const handleClickDetailModal = () => setIsDetailModalVisible(!isDetailModalVisible);
  const handleClickDeliveryModal = () => setIsDeliveryModalVisible(!isDeliveryModalVisible);
  const handleClickCancelModal = () => setIsCancelModalVisible(!isCancelModalVisible);
  const handleClickViewOrderModal = () => setIsViewOrderModalVisible(!isViewOrderModalVisible);

  const handleLotCancel = async () => {
    try {
      await lotApi.put(`lots/${lot.lotId}/status`, {
        lotStatusName: "Canceled",
        description: cancelReason,
      });
      message.success("Canceled successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to cancel lot: " + error.message);
    }
  };
  const handleLotDelete = async () => {
    try {
      await lotApi.delete(`lots/${lot.lotId}`);
      message.success("Deleted successfully!");
      refetch();
    } catch (error) {
      message.error("Failed to delete lot: " + error.message);
    }
  };
  const handleLotDelivery = async () => {
    try {
      await lotApi.put(`lots/${lot.lotId}/status`, {
        lotStatusName: "To Receive",
      });
      message.success("Delivery approved");
      refetch();
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleLotComplete = async () => {
    try {
      console.log(lot);
      await Promise.all([
        lotApi.put(`lots/${lot.lotId}/status`, {
          lotStatusName: "Completed",
        }),
        paymentApi.post(`payout`, {
          Amount: lot?.finalPrice,
          BreederId: lot?.breederId,
        }),
      ]).then(([response, paymentResponse]) => {
        console.log("response", response.data);
        console.log("paymentResponse", paymentResponse.data);
        message.success('Completed successfully!');
      });
      refetch();
    } catch (error) {
      message.error("Failed to complete lot: " + error.message);
    }
  };

  return (
    <>
      <Card className="lot-card-wrapper"
        title={
          <div className="lot-card-title" >
            <span style={{ color: "#838181" }}>#{lot?.lotId} - </span>
            <span >{lot?.sku}</span>
          </div>
        }
        extra={
          <>
            <div className="status-badge">
              <Image
                width={24}
                height={24}
                preview={false}
                src={tabData.lotStatusIconLink}
              />
              <span className="status-text">{tabData.lotStatusName}</span>
            </div>

          </>
        }
        actions={[
          <div key="button-container" style={{
            display: "flex",
            justifyContent: "end",
            gap: "12px",
            marginRight: "32px"
          }}>
            <Button type="primary" size="large" key="view-lot" onClick={handleClickDetailModal}>Detail</Button>
            {userRoleId == 2 && tabData.lotStatusId < 3 && (
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={handleLotDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  size="large"
                  danger
                >
                  Delete
                </Button>

              </Popconfirm>
            )}
            {userRoleId > 2 && tabData.lotStatusId == 7 && (
              <>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleClickDeliveryModal}
                >
                  Delivery
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleClickCancelModal}
                  danger
                >
                  Cancel
                </Button>
              </>
            )}
            {tabData.lotStatusId > 5 && (
              <>
                <Button type="primary" size="large" key="view-order" onClick={handleClickViewOrderModal}>View Order</Button>
              </>
            )}
            {userRoleId > 2 && tabData.lotStatusId == 8 && (
              <>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleLotComplete}
                >
                  Complete
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={handleClickCancelModal}
                  danger
                >
                  Cancel
                </Button>
              </>
            )}
          </div>,
        ]}
      >
        <Row style={{ gap: "16px" }}>
          <Col span={3} style={{}}>
            <Image
              src={lot?.koiFishDto?.koiMedia?.[0].filePath}
              width={"100%"}
              height={"100%"}
              alt="Koi Fish"
              className="koi-image"
              preview={false}
            />
          </Col>
          <Col span={10} style={{}}>
            <div className="lot-details">
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title" >Variety: </Text>
                <Text className="lot-detail-item-content">{lot?.koiFishDto?.variety}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">By: </Text>
                <Text className="lot-detail-item-content">{lot?.breederDetailDto?.farmName}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">Farm Name: </Text>
                <Text className="lot-detail-item-content">{lot?.breederDetailDto?.farmName}</Text>
              </div>
              <div className="lot-detail-item">
                <Text className="lot-detail-item-title">Method: </Text>
                <Text className="lot-detail-item-content">{lot?.auctionMethod?.auctionMethodName}</Text>
              </div>
            </div>
          </Col>
          <Col span={8}>
          </Col>
        </Row>
        <Modal
          open={isDetailModalVisible}
          onCancel={handleClickDetailModal}
          footer={null} // Bỏ footer để tùy chỉnh nút trong trang UpdateLotPage
          width={1200} // Đặt chiều rộng modal tùy ý
        >
          {/* Render trang UpdateLotPage */}
          <LotDetailPage
            lotData={lot}
            refetch={refetch}
            handleModalCancel={isDetailModalVisible}
          />
        </Modal>
        <Modal
          open={isDeliveryModalVisible}
          onCancel={handleClickDeliveryModal}
          footer={null}
          width={1200}
          style={{ top: 0 }}
        >
          <div className="delivery-modal">
            <h2>Delivery Information</h2>
            <Table
              dataSource={[
                {
                  key: "name",
                  label: "Name",
                  value:
                    lot?.winnerDto?.FirstName + " " + lot?.winnerDto?.LastName || "N/A",
                },
                {
                  key: "phone",
                  label: "Contact Number",
                  value: lot?.winnerDto?.Phone || "N/A",
                },
                {
                  key: "address",
                  label: "Delivery Address",
                  value: lot?.winnerDto?.Address || "N/A",
                },
              ]}
              columns={[
                {
                  title: "Property",
                  dataIndex: "label",
                  key: "label",
                  width: "40%",
                  render: (text) => <Text strong>{text}</Text>,
                },
                {
                  title: "Value",
                  dataIndex: "value",
                  key: "value",
                },
              ]}
              pagination={false}
              size="middle"
              bordered
            />
            <div style={{ marginTop: 20, textAlign: "right" }}>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={handleLotDelivery}
              >
                Approve
              </Button>
            </div>
          </div>
        </Modal>
        <Modal
          title="Reason why cancel this lot"
          open={isCancelModalVisible}
          onCancel={() => {
            setIsCancelModalVisible(false);
          }}
          onOk={handleLotCancel}
        >
          <TextArea
            placeholder="Reason"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </Modal>
        <Modal
          open={isViewOrderModalVisible}
          onCancel={handleClickViewOrderModal}
          footer={null}
          width={1200}
          style={{ top: 0 }}
        >
          <OrderInfoModal
            soldlotInfoData={soldLotDataMock}
            onCancel={handleClickViewOrderModal}
          />
        </Modal>
      </Card>
    </>
  )
}

const OrderInfoModal = ({ soldlotInfoData, onCancel }) => {
  const winner = soldlotInfoData.winnerDto;
  return (
    <>
      <div style={{ padding: "36px", paddingTop: "0px" }}>
        <div style={{ paddingTop: "24px" }}>
          <div className="inner-card-container">
            <Card
              className="inner-card"
              title={
                <p className="inner-card-title">
                  Delivery Infomation
                </p>
              }
            >
              <div className="info-container">
                <span className="info-label">Full Name: </span>
                <span className="info-content">{winner?.FirstName + winner?.LastName}</span>
              </div>
              <div className="info-container">
                <span className="info-label">Phone: </span>
                <span className="info-content">{winner?.Phone}</span>
              </div>
              <div className="info-container">
                <span className="info-label">Address: </span>
                <span className="info-content">{winner?.Address}</span>
              </div>
            </Card>
            <Card
              className="inner-card"
              title={
                <p className="inner-card-title">
                  Status
                </p>
              }
            >
              <div className="info-container">
                <span className="info-label">Status: </span>
                <span className="info-content">{(soldlotInfoData) ? soldlotInfoData?.lotDto?.lotStatusDto?.lotStatusName : "N/A"}</span>
              </div>
              <div className="info-container">
                <span className="info-label">Update at: </span>
                <span className="info-content">{(soldlotInfoData) ? formatDateTime(soldlotInfoData?.createdAt) : "...."}</span>
              </div>
            </Card>
          </div>
          <Card className="inner-card">
            <div>
              <Row>
                <Col className="info-field" span={4}>
                  <Image
                    src={soldlotInfoData?.lotDto?.koiFish?.koiMedia?.[0]?.filePath}
                    width={"100%"}
                    height={"100%"}
                    alt="Koi Fish"
                  />
                </Col>
                <Col className="info-field" span={20}>
                  <h2 className="info-title">Koi Fish Infomation</h2>
                  <div className="divider"><hr /></div>
                  <Row>
                    <Col span={14}>
                      <div className="info-container">
                        <span className="info-label">Variety: </span>
                        <span className="info-content">{soldlotInfoData?.lotDto?.koiFishDto?.variety || "..."}</span>

                      </div>
                      <div className="info-container">
                        <span className="info-label">By: </span>
                        <span className="info-content">{soldlotInfoData?.lotDto?.breederDetailDto?.farmName || "Unknown"}</span>
                      </div>
                      <div className="info-container">
                        <span className="info-label">Method: </span>
                        <span className="info-content">{soldlotInfoData?.lotDto?.auctionMethod?.auctionMethodName || "Unknown"}</span>
                      </div>
                    </Col>
                    <Col span={10}>
                      <div className="info-container">
                        <span className="info-label">Final Price: </span>
                        <span className="info-content">{(soldlotInfoData) ? formartMoney(soldlotInfoData?.finalPrice) : "..."} VND</span>
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </div>
            <div style={{ marginTop: "30px" }}>
              <Row>
                <Col className="info-payment-item-title" span={18}>
                  <span>Total Price</span>
                </Col>
                <Col className="info-payment-item-content" span={6}>
                  <span>Total Price</span>
                </Col>

              </Row>
              <Row>
                <Col className="info-payment-item-title" span={18}>
                  <span>Deposit</span>
                </Col>
                <Col className="info-payment-item-content" span={6}>
                  <span>Deposit</span>
                </Col>
              </Row>
              <Row>
                <Col className="info-payment-item-title" span={18}>
                  <span>Pay</span>
                </Col>
                <Col className="info-payment-item-content" span={6}>
                  <span>Pay</span>
                </Col>

              </Row>
              <Row>
                <Col className="info-payment-item-title" span={18}>
                  <span>Payment Status</span>
                </Col>
                <Col className="info-payment-item-content" span={6}>
                  <span>Payment Status</span>
                </Col>
              </Row>
            </div>
          </Card>
        </div>

        <div key="button-container" style={{
          display: "flex",
          justifyContent: "end",
          gap: "36px",
          margin: "24px"
        }}>
          {/* {(user?.UserRoleId == 1 && soldlotInfoData?.lotDto?.lotStatusDto?.lotStatusId == 5) && (
            <Button type="primary" size="large" key="view-lot" onClick={handlePayment}>
              Payment
            </Button>
          )} */}

          <Button size="large" key="view-order" onClick={onCancel} >Cancel</Button>
        </div>
      </div>
    </>
  )
}
export default LotCard;
