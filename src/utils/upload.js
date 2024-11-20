// Import các hàm cần thiết từ Firebase SDK
import storage from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Khởi tạo đối tượng Firebase Storage

// Hàm upload file
const uploadToFirebase = async (file) => {
  try {
    //console.log(file); // In ra thông tin file để kiểm tra

    // Tạo một tham chiếu đến vị trí lưu trữ trên Firebase Storage
    const storageRef = ref(storage, file.name);

    // Tải file lên Firebase Storage
    const response = await uploadBytes(storageRef, file);

    // Lấy URL tải xuống của file đã tải lên
    const downloadURL = await getDownloadURL(response.ref);

    // Trả về URL tải xuống
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Ném lỗi để xử lý bên ngoài hàm
  }
};

export default uploadToFirebase;