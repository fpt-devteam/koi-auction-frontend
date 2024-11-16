import {
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  message,
  Button
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import lotApi from '../../config/lotApi';
import axios from 'axios';

const { Option } = Select;

const LotInfo = ({ initData, showLotStatus = true, form }) => {
  const [auctionMethods, setAuctionMethods] = useState([]);
  const [koiVarieties, setKoiVarieties] = useState([]);

  //fetch auction methods
  const fetchAuctionMethods = async () => {
    try {
      const response = await lotApi.get('auction-methods');
      const fetchedAuctionMethods = response.data;
      setAuctionMethods(fetchedAuctionMethods);
    } catch (error) {
      message.error(error.message);
    }
  };
  const fetchKoiVarieties = async () => {
    try {
      const response = await axios.get(
        'https://66f961f6afc569e13a989d9d.mockapi.io/KOi'
      );
      setKoiVarieties(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  // Transform the API data for Select options
  const koiOptions = useMemo(() => {
    return koiVarieties.map((koi) => ({
      value: koi.variety,
      label: koi.variety
    }));
  }, [koiVarieties]);
  useEffect(() => {
    fetchKoiVarieties();
  }, []);

  useEffect(() => {
    fetchAuctionMethods();
  }, []);

  const defaultLot = useMemo(() => {
    return (
      initData || {
        startingPrice: '',
        createdAt: 'N/A',
        koiFishDto: {
          variety: '',
          sex: '',
          sizeCm: '',
          yearOfBirth: ''
        },
        lotStatusDto: {
          lotStatusName: 'Unknown'
        },
        auctionMethod: {
          auctionMethodName: ''
        }
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
      lotStatusName: defaultLot.lotStatusDto.lotStatusName
    });
  }, [defaultLot, form]);

  return (
    <>
      <p style={{ marginBottom: '24px', color: '#888' }}>
        Created at {defaultLot.createdAt}
      </p>

      {/* Starting Price */}
      <Form.Item
        label="Starting Price (VND)"
        name="startingPrice"
        rules={[
          {
            required: true,
            message: 'Please enter the starting price'
          },
          {
            type: 'number',
            min: 100000,
            message: 'Starting price must be at least 100,000 VND'
          }
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      {/* Variety */}
      <Form.Item
        label="Variety"
        name="variety"
        rules={[
          { required: true, message: 'Please enter the variety' }
        ]}
      >
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={koiOptions}
        />
      </Form.Item>

      {/* Size và Weight */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Size (cm)"
            name="sizeCm"
            rules={[
              { required: true, message: 'Please enter size' },
              {
                type: 'number',
                min: 15,
                max: 120,
                message: 'Size must be between 15 and 120 cm'
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Weight (kg)"
            name="weightKg"
            rules={[
              { required: true, message: 'Please enter weight' },
              {
                type: 'number',
                min: 0.2,
                max: 15,
                message: 'Weight must be between 0.2 and 15 kg'
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Year or birth and sex */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Sex"
            name="sex"
            rules={[
              { required: true, message: 'Please select the sex' }
            ]}
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
            rules={[
              {
                required: true,
                message: 'Please enter year of birth'
              },
              {
                type: 'number',
                min: 1900,
                max: new Date().getFullYear(),
                message: `Year of birth must be between 1900 and ${new Date().getFullYear()}`
              }
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Combobox cho auctionMethod */}
      <Form.Item
        label="Auction Method"
        name="auctionMethodId"
        rules={[
          {
            required: true,
            message: 'Please select the auction method'
          }
        ]}
      >
        <Select placeholder="Select auction method">
          {auctionMethods.map((method) => (
            <Option
              key={method.auctionMethodId}
              value={method.auctionMethodId}
            >
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
