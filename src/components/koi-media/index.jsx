import { Image } from "antd";

const KoiMedia = ({ media }) => {
  return (
    <Image
      src={media[0]?.filePath || "default-image-url"}
      alt="Koi Fish"
      width={"100%"}
      style={{ borderRadius: "8px", minHeight: "400px", marginBottom: "20px" }}
    />
  );
};

export default KoiMedia;
