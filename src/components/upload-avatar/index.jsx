import { Upload, Button, message, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import uploadToFirebase from "../../utils/upload";
import { useState } from "react";

// Maximum size for avatar
const MAX_IMAGE_SIZE_MB = 2; // 2MB for avatar

const UploadAvatar = ({ initData, form, showOnly = false }) => {
  const [avatar, setAvatar] = useState(initData || null);
  const fileList = avatar ? [
    {
      uid: -1,
      name: 'Avatar',
      status: 'done',
      url: avatar.filePath,
    }
  ] : [];

  // Validate avatar before upload
  const handleBeforeUploadImage = (file) => {
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return false;
    }
    if (file.size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
      message.error(`Image size must be smaller than ${MAX_IMAGE_SIZE_MB}MB!`);
      return false;
    }
    return false; // Prevent default upload behavior
  };

  // Handle file change
  const handleChange = async ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[fileList.length - 1];
      if (file.originFileObj) {
        const firebaseUrl = await uploadToFirebase(file.originFileObj);
        const newAvatar = { filePath: firebaseUrl };
        form.setFieldsValue({ avatar: newAvatar });
        setAvatar(newAvatar);
      }
    } else {
      form.setFieldsValue({ avatar: null });
      setAvatar(null);
    }
  };

  return (
    <Form.Item
      style={{ marginBottom: "24px" }}
      name="avatar"
      rules={[{ required: true, message: "Please upload an avatar" }]}
    >
      <Upload
        beforeUpload={handleBeforeUploadImage}
        listType="picture-circle"
        onChange={handleChange}
        fileList={fileList}
        showUploadList={{ showRemoveIcon: !showOnly }}
        maxCount={1}
      >
        {!showOnly && (!avatar ? (
          <Button icon={<UploadOutlined />}>Upload Avatar</Button>
        ) : null)}
      </Upload>
    </Form.Item>
  );
};

export default UploadAvatar;
