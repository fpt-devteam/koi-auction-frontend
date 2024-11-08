import { useState } from "react";
import { Select, Button, Row, Col } from "antd";

const { Option } = Select;

const KoiSearchBar = ({ allLots, setFilteredLots }) => {
  console.log("all lot in component: ", allLots);

  const [selectedVariety, setSelectedVariety] = useState("");
  const [selectedSex, setSelectedSex] = useState("");

  const varietyOptions = [
    ...new Set(
      allLots.map((lot) => lot.variety).filter((variety) => variety != null)
    ),
  ];

  const handleFilter = () => {
    console.log("hello", selectedVariety);
    const result = allLots.filter((lot) => {
      return (
        (selectedVariety ? lot.variety === selectedVariety : true) &&
        (selectedSex !== "" ? lot.sex === (selectedSex === "Female") : true)
      );
    });
    setFilteredLots(result);
    console.log("result: ", result);
  };

  const handleReset = () => {
    setSelectedVariety("");
    setSelectedSex("");
    setFilteredLots(allLots);
  };

  return (
    <Row
      gutter={16}
      justify="space-between"
      style={{
        backgroundColor: "#2E3A47", // Đổi màu nền tối hơn
        padding: "10px",
        borderRadius: "8px",
        color: "#ffffff", // Đổi màu chữ thành màu sáng
        display: "flex",
        alignItems: "center",
        marginBottom: "2%",
      }}
    >
      <Col>
        <Select
          value={selectedVariety}
          onChange={(value) => setSelectedVariety(value)}
          placeholder="All varieties"
          style={{
            width: 150,
            backgroundColor: "#ffffff",
            color: "#333333", // Màu chữ tối cho dropdown
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          <Option value="">All varieties</Option>
          {varietyOptions.map((variety) => (
            <Option key={variety} value={variety}>
              {variety}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Select
          value={selectedSex}
          onChange={(value) => setSelectedSex(value)}
          placeholder="All sexes"
          style={{
            width: 150,
            backgroundColor: "#ffffff",
            color: "#333333", // Màu chữ tối cho dropdown
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          <Option value="">All sexes</Option>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
        </Select>
      </Col>
      <Col style={{ marginLeft: "auto" }}>
        <Button
          type="primary"
          onClick={handleFilter}
          style={{
            backgroundColor: "#1F7AEC", // Màu xanh nổi bật cho nút
            borderColor: "#1F7AEC",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Display
        </Button>
      </Col>
      <Col>
        <Button
          onClick={handleReset}
          style={{
            backgroundColor: "#4B5563", // Màu xám cho nút Reset
            borderColor: "#4B5563",
            color: "#ffffff",
            fontWeight: "bold",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Reset
        </Button>
      </Col>
    </Row>
  );
};
export default KoiSearchBar;
