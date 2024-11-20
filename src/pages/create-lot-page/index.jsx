import { useNavigate } from "react-router-dom";
import LotLayout from "../../components/mng-lot-layout";
import lotApi from "../../config/lotApi";
import { message } from "antd";
import { useSelector } from "react-redux";

const CreateLotPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const onCreate = async (values) => {
    // //console.log(values);
    // Xử lý lưu form
    const updatedValues = {
      ...values, // Giữ lại các trường từ form
      breederId: user.UserId, // Thêm trường mới
    };
    //console.log(updatedValues);
    try {
      const response = await lotApi.post("lots", updatedValues);
      // //console.log("Create Lot Response:", response);
      message.success(response.statusText);
      navigate("/management/lots");
    } catch (error) {
      //console.error("Failed to create Lot:", error);
    }
  };

  return (
    <LotLayout
      title="Create New Lot"
      uploadKoiMediaData={null}
      lotData={null}
      showLotStatus={false}
      onCreate={onCreate}
      isView={false} // Chế độ Edit nên là false
      isCreate={true} // Chế độ Create nên là true
    />
  );
};

export default CreateLotPage;
