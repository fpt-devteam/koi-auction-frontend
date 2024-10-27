import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

const sizeMap = {
  small: 1, // rem value for small size
  medium: 1.5, // rem value for medium size
  large: 2, // rem value for large size
};

const PriceDisplayComponent = ({
  text,
  value,
  size = "medium",
  style = {},
}) => {
  // Use the sizeMap to determine the rem size based on the size prop
  const fontSize = sizeMap[size] || sizeMap["medium"]; // Default to medium if size is not found

  const defaultTextStyle = {
    fontSize: `${fontSize}rem`,
    fontWeight: "bold",
    ...style, // Merge the passed style prop with default styles
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <Text strong style={defaultTextStyle}>
        {text}:{" "}
      </Text>
      <Text strong style={{ ...defaultTextStyle, color: "red" }}>
        {value != null ? value.toLocaleString() + "VND" : ""}
      </Text>
    </div>
  );
};

export default PriceDisplayComponent;
