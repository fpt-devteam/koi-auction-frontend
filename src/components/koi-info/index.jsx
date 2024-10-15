import { Descriptions } from "antd";

const KoiInfoText = ({ koi, breederDetailDto }) => {
  const { variety, sex, sizeCm, yearOfBirth } = koi;

  return (
    <Descriptions
      bordered
      column={1} // Số cột
      size="small" // Kích thước bảng nhỏ
    >
      <Descriptions.Item
        label="Variety"
        labelStyle={{ width: "100px" }} // Điều chỉnh độ rộng của nhãn
      >
        <span style={{ color: "red" }}>{variety || "N/A"}</span>
      </Descriptions.Item>

      <Descriptions.Item
        label="Breeder(s)"
        labelStyle={{ width: "100px" }} // Điều chỉnh độ rộng của nhãn
      >
        <span style={{ color: "red" }}>
          {breederDetailDto?.farmName || "N/A"}
        </span>
      </Descriptions.Item>

      <Descriptions.Item
        label="Sex"
        labelStyle={{ width: "100px" }} // Điều chỉnh độ rộng của nhãn
      >
        {sex === "Male" ? "Male" : "Female"}
      </Descriptions.Item>

      <Descriptions.Item
        label="Born in"
        labelStyle={{ width: "100px" }} // Điều chỉnh độ rộng của nhãn
      >
        {yearOfBirth}
      </Descriptions.Item>

      <Descriptions.Item
        label="Size"
        labelStyle={{ width: "100px" }} // Điều chỉnh độ rộng của nhãn
      >
        {sizeCm} cm
      </Descriptions.Item>
    </Descriptions>
  );
};

export default KoiInfoText;
