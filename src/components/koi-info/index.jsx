import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

const KoiInfo = ({ koi, breederDetailDto }) => {
  const { variety, sex, sizeCm, yearOfBirth } = koi;

  // Define styles
  const labelStyle = { fontWeight: "bold", fontSize: "1rem" };
  const valueStyle = { fontSize: "1rem" };

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <Text strong style={labelStyle}>
          Variety:{" "}
        </Text>
        <Text style={{ ...valueStyle, color: variety ? "red" : "grey" }}>
          {variety || "N/A"}
        </Text>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <Text strong style={labelStyle}>
          Breeder(s):{" "}
        </Text>
        <Text
          style={{
            ...valueStyle,
            // color: "grey",
          }}
        >
          {breederDetailDto?.farmName || "N/A"}
        </Text>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <Text strong style={labelStyle}>
          Sex:{" "}
        </Text>
        <Text style={valueStyle}>{(sex ? "Male" : "Female") || "Unknown"}</Text>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <Text strong style={labelStyle}>
          Born in:{" "}
        </Text>
        <Text style={valueStyle}>{yearOfBirth || "Unknown"}</Text>
      </div>

      <div style={{ marginBottom: "8px" }}>
        <Text strong style={labelStyle}>
          Size:{" "}
        </Text>
        <Text style={valueStyle}>{sizeCm ? `${sizeCm} cm` : "N/A"}</Text>
      </div>
    </div>
  );
};

export default KoiInfo;
