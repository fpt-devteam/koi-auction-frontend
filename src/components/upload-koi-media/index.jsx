/* eslint-disable react/prop-types */
import { Upload, Button, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import uploadToFirebase from "../../utils/upload";
import { useState } from "react";

// Kích thước tối đa
const MAX_IMAGE_SIZE_MB = 5; // 5MB cho mỗi ảnh
const MAX_IMAGES = 4; // Tối đa 4 ảnh

const UploadKoiMedia = ({ initData, form }) => {
  // console.log("koiMedia", koiMedia);
  const [koiMedia, setKoiMedia] = useState(initData || []);
  const fileList = koiMedia.map((file, index) => {
    // Nếu là file local (chưa upload lên Firebase) thì dùng createObjectURL
    return {
      uid: file.koiMediaId || index, // Sử dụng koiMediaId hoặc index làm UID
      name: file.name || `Image ${index + 1}`, // Tên của file
      status: "done", // Đánh dấu là đã upload
      url: file.filePath, // Firebase URL
    };
  });

  // Kiểm tra trước khi upload file ảnh
  const handleBeforeUploadImage = (file) => {
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return false;
    }
    if (file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
      message.error(`Image size must be smaller than ${MAX_IMAGE_SIZE_MB}MB!`);
      return false;
    }
    if (koiMedia.length >= MAX_IMAGES) {
      message.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return false;
    }
    return false; // Ngăn Ant Design tự upload, vì chúng ta sẽ xử lý riêng việc upload lên Firebase
  };

  // Xử lý khi thay đổi (upload hoặc xóa file)
  const handleChange = async ({ fileList }) => {
    // Upload file mới lên Firebase nếu là local file
    const updatedKoiMedia = await Promise.all(
      fileList.map(async (file) => {
        if (file.originFileObj) {
          // Upload file từ local lên Firebase
          const firebaseUrl = await uploadToFirebase(file.originFileObj);
          return {
            filePath: firebaseUrl, // Lưu lại URL từ Firebase sau khi upload
          };
        }
        return {
          filePath: file.url, // Giữ nguyên file đã có sẵn từ Firebase
        }; // Giữ nguyên file đã có sẵn từ Firebase
      })
    );
    form.setFieldsValue({ koiMedia: updatedKoiMedia });
    setKoiMedia(updatedKoiMedia);
  };

  return (
    <Form.Item style={{ marginBottom: "24px" }} name="koiMedia">
      {/* Khu vực upload ảnh */}
      <Upload
        beforeUpload={handleBeforeUploadImage}
        listType="picture"
        onChange={handleChange} // Xử lý khi file được upload hoặc xóa
        fileList={fileList} // Danh sách file đã upload
      >
        <Button type="primary" icon={<UploadOutlined />}>
          Upload Images
        </Button>
        <span>
          (Max {MAX_IMAGES}, each up to {MAX_IMAGE_SIZE_MB}MB)
        </span>
      </Upload>
    </Form.Item>
  );
};

export default UploadKoiMedia;
