// import { Image } from "antd";

// const KoiMedia = ({ media }) => {
//   return (
//     <Image
//       src={media[0]?.filePath || "default-image-url"}
//       alt="Koi Fish"
//       width={"100%"}
//       style={{ borderRadius: "8px", minHeight: "400px", marginBottom: "20px" }}
//     />
//   );
// };

// export default KoiMedia;


import { Carousel, Image } from "antd";

const KoiMedia = ({ media }) => {
  return (
    <Carousel>
      {media.length > 0
        ? media.map((item, index) => (
            <div key={index}>
              <Image
                src={item.filePath}
                alt={`Koi Fish ${index + 1}`}
                width={"100%"}
                style={{
                  borderRadius: "8px",
                  minHeight: "400px",
                  marginBottom: "20px",
                }}
              />
            </div>
          ))
        : // Nếu không có media nào, hiển thị ảnh mặc định
          <div>
            <Image
              src="default-image-url"
              alt="Default Koi Fish"
              width={"100%"}
              style={{
                borderRadius: "8px",
                minHeight: "400px",
                marginBottom: "20px",
              }}
            />
          </div>}
    </Carousel>
  );
};

export default KoiMedia;
