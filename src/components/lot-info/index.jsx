import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  message,
  Button,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import lotApi from "../../config/lotApi";

const { Option } = Select;

const LotInfo = ({ initData, showLotStatus = true, form }) => {
  const [auctionMethods, setAuctionMethods] = useState([]);
  //fetch auction methods
  const fetchAuctionMethods = async () => {
    try {
      const response = await lotApi.get("auction-methods");
      const fetchedAuctionMethods = response.data;
      setAuctionMethods(fetchedAuctionMethods);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAuctionMethods();
  }, []);

  const defaultLot = useMemo(() => {
    return (
      initData || {
        startingPrice: "",
        createdAt: "N/A",
        koiFishDto: {
          variety: "",
          sex: "",
          sizeCm: "",
          yearOfBirth: "",
        },
        lotStatusDto: {
          lotStatusName: "Unknown",
        },
        auctionMethod: {
          auctionMethodName: "",
        },
      }
    );
  }, [initData]);

  //form set initial values
  useEffect(() => {
    form.setFieldsValue({
      startingPrice: defaultLot.startingPrice,
      createdAt: defaultLot.createdAt,
      variety: defaultLot.koiFishDto.variety,
      sex: defaultLot.koiFishDto.sex,
      sizeCm: defaultLot.koiFishDto.sizeCm,
      weightKg: defaultLot.koiFishDto.weightKg,
      yearOfBirth: defaultLot.koiFishDto.yearOfBirth,
      auctionMethodId: defaultLot.auctionMethod.auctionMethodId,
      lotStatusName: defaultLot.lotStatusDto.lotStatusName,
    });
  }, [defaultLot, form]);

  return (
    <>
      <p style={{ marginBottom: "24px", color: "#888" }}>
        Created at {defaultLot.createdAt}
      </p>

      {/* Starting Price */}
      <Form.Item
        label="Starting Price"
        name="startingPrice"
        rules={[{ required: true, message: "Please enter the starting price" }]}
      >
        <InputNumber min={51} style={{ width: "100%" }} />
      </Form.Item>

      {/* Variety */}
      <Form.Item
        label="Variety"
        name="variety"
        rules={[{ required: true, message: "Please enter the variety" }]}
      >
        <Input placeholder="Enter variety" />
      </Form.Item>

      {/* Size và Weight */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Size (cm)"
            name="sizeCm"
            rules={[{ required: true, message: "Please enter size" }]}
          >
            <InputNumber min={1} max={2147483647} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Weight (kg)"
            name="weightKg"
            rules={[{ required: true, message: "Please enter weight" }]}
          >
            <InputNumber min={0.02} style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Year or birth and sex */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Sex"
            name="sex"
            rules={[{ required: true, message: "Please select the sex" }]}
          >
            <Select placeholder="Select sex">
              <Option value={true}>Male</Option>
              <Option value={false}>Female</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Year of Birth"
            name="yearOfBirth"
            rules={[{ required: true, message: "Please enter year of birth" }]}
          >
            <InputNumber
              min={1900}
              max={new Date().getFullYear()}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Combobox cho auctionMethod */}
      <Form.Item
        label="Auction Method"
        name="auctionMethodId"
        rules={[
          { required: true, message: "Please select the auction method" },
        ]}
      >
        <Select placeholder="Select auction method">
          {auctionMethods.map((method) => (
            <Option key={method.auctionMethodId} value={method.auctionMethodId}>
              {method.auctionMethodId}. {method.auctionMethodName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Trường lotStatus tùy chọn */}
      {showLotStatus && (
        <Form.Item label="Lot Status" name="lotStatusName">
          <Input disabled />
        </Form.Item>
      )}
    </>
  );
};

export default LotInfo;
