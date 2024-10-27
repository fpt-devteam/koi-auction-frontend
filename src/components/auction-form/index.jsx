import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import {
  TimePicker,
  Form,
  Button,
  DatePicker,
  Table,
  Popconfirm,
  message,
  Row,
  Col,
  Image,
  Typography,
  InputNumber,
} from "antd";
const { Text } = Typography;
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import lotApi from "../../config/lotApi";

const DATE_FORMAT = "YYYY-MM-DD",
  TIME_FORMAT = "HH:mm";
const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 500;
const MIN_STEP_PRECENT = 1;
const MAX_STEP_PRECENT = 100;

export default function AuctionForm({
  auctionId,
  auctionLots,
  approvedLots,
  onSubmit,
  handleReset,
  mode,
}) {
  const [formVariable] = useForm();
  const [auctionLotList, setAuctionLotList] = useState([]);
  const [approvedLotSource, setApprovedLotSource] = useState([]);
  const { user } = useSelector((store) => store.user);
  const [auction, setAuction] = useState();

  const handleLotChange = (lotId, updatedValues) => {
    setAuctionLotList((prevLots) => {
      const updatedList = prevLots.map((lot) =>
        lot.lotId === lotId ? { ...lot, ...updatedValues } : lot
      );
      console.log("Updated Auction Lot List:", updatedList);
      return updatedList;
    });
  };
  useEffect(() => {
    if (auctionId) {
      const getAuction = async (auctionId) => {
        const auction = await lotApi
          .get(`auctions/${auctionId}`)
          .catch((err) => {
            console.log(err);
          });
        setAuction(auction?.data);
      };
      getAuction(auctionId);
    }
  }, [auctionId]);
  useEffect(() => {
    if (approvedLots.length > 0) {
      const list = approvedLots.map((item) => ({
        ...item,
        auctionLotId: item.lotId,
        orderInAuction: 0,
        duration: MIN_DURATION_MINUTES,
        stepPercent: MIN_STEP_PRECENT,
      }));
      setApprovedLotSource(list);
    }
  }, [approvedLots]);
  useEffect(() => {
    if (auctionLots.length > 0) {
      setAuctionLotList(auctionLots);
    }
  }, [auctionLots]);
  //Set data for the form
  useEffect(() => {
    if (auction) {
      formVariable.setFieldsValue({
        hostDate: dayjs(auction?.startTime),
        startTime: dayjs(auction?.startTime),
      });
    }
  }, [auction, formVariable]);
  // Disable past dates in form
  // const disabledDate = (current) => {
  //     return current && current < dayjs().add(0, "day").endOf("day");
  // };
  // // Disable past time in form
  // const disabledPastTimes = () => {
  //     const currentHour = moment().hour();
  //     const currentMinute = moment().minute();
  //     return {
  //         disabledHours: () => Array.from({ length: 24 }, (_, i) => i).slice(0, currentHour),
  //         disabledMinutes: (selectedHour) => {
  //             if (selectedHour === currentHour) {
  //                 return Array.from({ length: 60 }, (_, i) => i).slice(0, currentMinute);
  //             }
  //             return [];
  //         },
  //     };
  // };
  const handleSubmit = async (values) => {
    const hostDate = values.hostDate ? dayjs(values.hostDate) : null;
    const startTime = values.startTime
      ? dayjs(values.startTime, TIME_FORMAT)
      : null;
    const combinedDateTime =
      hostDate && startTime
        ? hostDate
            .hour(startTime.hour())
            .minute(startTime.minute())
            .second(startTime.second())
        : null;
    const auctionData = {
      staffId: user.UserId,
      hostDate: hostDate ? hostDate.format(DATE_FORMAT) : null,
      startTime: combinedDateTime
        ? combinedDateTime.format(`${DATE_FORMAT} HH:mm:00`)
        : null,
    };
    const now = dayjs();
    if (combinedDateTime.isBefore(now)) {
      message.error("The selected time is in the past");
      return;
    }
    console.log(combinedDateTime);
    console.log(now);
    console.log("HEHEHE");
    let itoaList = [],
      atoiList = [],
      updateAuctionLotList = [];
    //Get the list of lot need to change status form InAuction to Approved
    if (approvedLotSource.length > 0) {
      approvedLotSource.forEach((e1) => {
        let isExist = approvedLots.some((e2) => e1.lotId === e2.lotId);
        if (!isExist) {
          itoaList.push(e1);
        }
      });
    }
    //Get the list of lot need to change status form Approved to InAuction
    let cnt = 0;
    if (auctionLotList.length > 0) {
      auctionLotList.forEach((e1) => {
        cnt++;
        e1.orderInAuction = cnt;
      });
      auctionLotList.forEach((e1) => {
        let isExist = approvedLots.some((e2) => e1.lotId === e2.lotId);
        if (isExist) {
          atoiList.push(e1);
        }
      });
      auctionLotList.forEach((e1) => {
        let isExist = auctionLots.some((e2) => e1.lotId === e2.lotId);
        if (isExist) {
          updateAuctionLotList.push(e1);
        }
      });
    }
    onSubmit(auctionData, atoiList, itoaList, updateAuctionLotList);
  };
  const handleClick = () => {
    if (!auctionLotList.length) {
      message.error(
        "No lots selected! Please add at least one lot to the auction."
      );
      return;
    }
    formVariable.submit();
  };
  return (
    <>
      <div>
        <Form
          form={formVariable}
          onFinish={handleSubmit}
          className="form-container"
        >
          <Form.Item
            className="form-item-label"
            name={"hostDate"}
            label={"Host Date"}
            rules={[
              {
                required: true,
                message: "Please choose a day",
              },
            ]}
          >
            <DatePicker placeholder={DATE_FORMAT} />
          </Form.Item>{" "}
          <Form.Item
            className="form-item-label"
            name={"startTime"}
            label={"Start Time"}
            rules={[
              {
                required: true,
                message: "Please pick start time",
              },
            ]}
          >
            <TimePicker format={TIME_FORMAT} placeholder={TIME_FORMAT} />
          </Form.Item>{" "}
        </Form>
      </div>
      <div></div>
      <div className="lots-container">
        <LotSection
          title="Auction Lots"
          lotSource={approvedLotSource}
          setLotSource={setApprovedLotSource}
          auctionLotList={auctionLotList}
          setAuctionLotList={setAuctionLotList}
          operation="Remove"
          onLotChange={handleLotChange}
        />
        <LotSection
          title="Approved Lots"
          lotSource={auctionLotList}
          setLotSource={setAuctionLotList}
          auctionLotList={approvedLotSource}
          setAuctionLotList={setApprovedLotSource}
          operation="Add"
          onLotChange={handleLotChange}
        />
      </div>
      <div className="button-container">
        <Button className="button" type="primary" onClick={handleClick}>
          {mode}
        </Button>
        <Button className="button reset" type="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
}
const LotSection = ({
  title,
  lotSource,
  setLotSource,
  auctionLotList,
  setAuctionLotList,
  operation,
  onLotChange,
}) => {
  return (
    <div className="lots-section">
      <h2>{title}</h2>
      <div className="table-container">
        <LotTable
          getLotSource={lotSource}
          setGetLotSource={setLotSource}
          giveLotSource={auctionLotList}
          setGiveLotSource={setAuctionLotList}
          operation={operation}
          onLotChange={onLotChange}
        />
      </div>
    </div>
  );
};

const LotTable = ({
  getLotSource,
  setGetLotSource,
  giveLotSource,
  setGiveLotSource,
  operation,
  onLotChange,
}) => {
  const columns = [
    {
      // title: "Lot",
      dataIndex: "lotId",
      key: "lotId",
      render: (_, record) => (
        <LotCardRow
          lot={record}
          operation={operation}
          onLotChange={onLotChange}
        />
      ),
    },
    {
      dataIndex: "Operation",
      render: (_, record) => {
        if (giveLotSource.length >= 1) {
          if (operation == "Add") {
            return (
              <Button
                type="primary"
                shape="circle"
                onClick={() => handleOperation(record)}
              >
                +
              </Button>
            );
          } else {
            return (
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleOperation(record)}
              >
                <Button type="primary" danger shape="circle">
                  -
                </Button>
              </Popconfirm>
            );
          }
        }
        return null;
      },
    },
  ];

  const handleOperation = (record) => {
    console.log("Operation");
    if (!getLotSource) {
      setGetLotSource([record]);
    } else {
      setGetLotSource([record, ...getLotSource]);
    }
    setGiveLotSource((newGiveLotSource) =>
      newGiveLotSource.filter(
        (giveLotSource) => giveLotSource.lotId != record.lotId
      )
    );
  };

  return (
    <Table
      dataSource={giveLotSource}
      columns={columns}
      rowKey="lotId"
      pagination={{ pageSize: 4 }}
      onLotChange={onLotChange}
    />
  );
};

const LotCardRow = ({ lot, operation, onLotChange }) => {
  const [duration, setDuration] = useState(
    lot.duration || MIN_DURATION_MINUTES
  );
  const [stepPercent, setStepPercent] = useState(
    lot.stepPercent || MIN_STEP_PRECENT
  );
  const handleDurationChange = (value) => {
    setDuration(value);
    onLotChange(lot.lotId, { duration: value, stepPercent });
  };

  const handleStepPercentChange = (value) => {
    setStepPercent(value);
    onLotChange(lot.lotId, { duration, stepPercent: value });
  };

  return (
    <>
      <div
        title={
          <div style={{ textAlign: "left" }}>
            {`${lot.koiFishDto.variety} #${lot.sku}`}
          </div>
        }
      >
        <Row gutter={[16, 16]}>
          {/* Image Placeholder */}
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={
                lot.koiFishDto.koiMedia?.[0]?.filePath ||
                "default-placeholder.png"
              }
              width={80}
              height={80}
            />
          </Col>

          {/* Details Section */}
          <Col xs={16} sm={16} md={16} lg={16} xl={16}>
            <Text strong>Starting Price: </Text>
            <span>{lot.startingPrice || "..."}</span>
            <br />

            <Text strong>Varitey: </Text>
            <span>{lot.koiFishDto.variety || "..."}</span>
            <br />

            <Text strong>Method: </Text>
            <span>{lot.auctionMethod.auctionMethodName || "..."}</span>
            <br />

            <Text strong>By: </Text>
            <span>{lot.breederDetailDto?.farmName || "Unknown"}</span>
            {operation === "Remove" && (
              <>
                <br />
                <Text strong>Duration (minute): </Text>
                <InputNumber
                  min={MIN_DURATION_MINUTES}
                  max={MAX_DURATION_MINUTES}
                  value={duration}
                  onChange={handleDurationChange}
                />
                <br />
                {lot.auctionMethod.auctionMethodId >= 3 && (
                  <>
                    <Text strong>Step Percent (%): </Text>
                    <InputNumber
                      min={MIN_STEP_PRECENT}
                      max={MAX_STEP_PRECENT}
                      value={stepPercent}
                      onChange={handleStepPercentChange}
                    />
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

/* Validation for new auction
Lot list is not empty 
Host Date is not in the past (Host Date is at least 3 days from today) 
*/
