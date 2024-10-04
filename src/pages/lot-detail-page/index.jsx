/* eslint-disable react/prop-types */
import { message } from "antd";
import LotLayout from "../../components/mng-lot-layout";
import lotApi from "../../config/lotApi";
import { useNavigate } from "react-router-dom";

const LotDetailPage = ({ lotData, handleCancel }) => {
  const navigate = useNavigate();
  const handleSave = async (values) => {
    // Xử lý lưu form
    const updatedValues = {
      ...values, // Giữ lại các trường từ form
      breederId: 1, // Thêm trường mới
    };

    console.log("Saving form data", updatedValues);
    console.log(updatedValues);
    // Gọi API tạo mới Lot
    try {
      await lotApi.put(`lots/${lotData.lotId}`, updatedValues);
      message.success("Updated successfully!");
      navigate("/management/lots");
      handleCancel();
    } catch (error) {
      console.error("Failed to create Lot:", error);
    }
  };

  return (
    <LotLayout
      title="Lot Detail"
      lotInfoData={lotData}
      uploadKoiMediaData={lotData.koiFishDto.koiMedia.$values || []}
      onSave={handleSave}
      onCancel={handleCancel}
      showLotStatus={true}
    />
  );
};

export default LotDetailPage;
