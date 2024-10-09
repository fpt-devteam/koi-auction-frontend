import { message } from "antd";
import LotLayout from "../../components/mng-lot-layout";
import lotApi from "../../config/lotApi";
import { useSelector } from "react-redux";

const LotDetailPage = ({ lotData, refetch, handleModalCancel }) => {
  const { user } = useSelector((store) => store.user);
  const handleUpdate = async (values) => {
    // Xử lý lưu form
    const updatedValues = {
      ...values, // Giữ lại các trường từ form
      breederId: user.UserId, // Thêm trường mới
    };

    // Gọi API tạo mới Lot
    try {
      await lotApi.put(`lots/${lotData.lotId}`, updatedValues);
      message.success("Updated successfully!");
      refetch(); // Gọi hàm refetch để load lại d
      handleModalCancel(); // Đóng modal
    } catch (error) {
      console.error("Failed to create Lot:", error);
    }
  };

  const updateLotStatus = async (id, lotStatusName) => {
    try {
      // Construct the API URL with the lot ID
      const url = `lots/${id}/status`;

      // Make the PUT request with Axios
      const response = await lotApi.put(url, {
        lotStatusName: lotStatusName, // Send the lot status in the request body
      });

      // Handle success, display success message or process response
      // console.log("Status updated successfully:", response.data);
      return response.data; // You can return the response data if needed
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleApprove = async () => {
    const lotId = lotData.lotId;
    const newStatus = "Approved";

    // Call the updateLotStatus function with the lot ID and new status
    await updateLotStatus(lotId, newStatus);
    message.success("Lot Approved");
    refetch();
    handleModalCancel();
  };

  const handReject = async () => {
    const lotId = lotData.lotId;
    const newStatus = "Rejected";

    // Call the updateLotStatus function with the lot ID and new status
    await updateLotStatus(lotId, newStatus);
    message.success("Lot Rejected");
    refetch();
    handleModalCancel();
  };

  return (
    <LotLayout
      title="Lot Detail"
      lotInfoData={lotData}
      uploadKoiMediaData={lotData.koiFishDto.koiMedia || []}
      onUpdate={handleUpdate}
      onApprove={handleApprove}
      onReject={handReject}
      showLotStatus={true}
    />
  );
};

export default LotDetailPage;
