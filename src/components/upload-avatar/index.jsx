import { Upload, message, Spin, Button } from "antd";
import { UploadOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import uploadToFirebase from "../../utils/upload";
import { useState } from "react";

const UploadAvatar = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleBeforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleChange = async ({ file }) => {
    if (file.status !== 'uploading') {
      try {
        setLoading(true);
        const firebaseUrl = await uploadToFirebase(file.originFileObj || file);
        console.log("Uploaded URL:", firebaseUrl);
        onChange?.(firebaseUrl);
      } catch (error) {
        message.error('Upload failed. Please try again.');
        console.error('Upload error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log("Current value in UploadAvatar:", value);

  return (
    <Upload
      listType="picture-card"
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
      showUploadList={false}
      customRequest={({ onSuccess }) => {
        onSuccess("ok");
      }}
    >
      {value ? (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {loading && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '5%',
              zIndex: 1
            }}>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </div>
          )}
          <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(255, 255, 255, 0.8)',
              zIndex: 2
            }}
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
          />
          <img
            src={value}
            alt="avatar"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '5%',
              border: '1px solid #ccc',
              objectFit: 'cover'
            }}
          />
        </div>
      ) : (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}>
          {loading ? (
            <LoadingOutlined style={{ fontSize: 30 }} />
          ) : (
            <>
              <UploadOutlined style={{ fontSize: 30 }} />
              <div style={{ marginTop: 8 }}>Upload</div>
            </>
          )}
        </div>
      )}
    </Upload>
  );
};

export default UploadAvatar;
