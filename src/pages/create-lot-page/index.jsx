import { useNavigate } from "react-router-dom";
import LotLayout from "../../components/mng-lot-layout";
import lotApi from "../../config/lotApi";
import { message } from "antd";

const CreateLotPage = () => {
  const navigate = useNavigate();

  const handleSave = async (values) => {
    // console.log(values);
    // Xử lý lưu form
    const updatedValues = {
      ...values, // Giữ lại các trường từ form
      breederId: 1, // Thêm trường mới
    };

    console.log("Saving form data", updatedValues);
    // console.log(updatedValues);
    // Gọi API tạo mới Lot
    try {
      const response = await lotApi.post("lots", updatedValues);
      // console.log("Create Lot Response:", response);
      message.success(response.statusText);
      navigate("/management/lots");
    } catch (error) {
      console.error("Failed to create Lot:", error);
    }
  };

  const handleCancel = () => {};

  return (
    <LotLayout
      title="Create New Lot"
      uploadKoiMediaData={null}
      lotData={null}
      showLotStatus={false}
      onSave={handleSave}
      onCancel={handleCancel}
      isView={false} // Chế độ Edit nên là false
    />
  );
};

export default CreateLotPage;
