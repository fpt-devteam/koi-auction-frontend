/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
// import styled from "styled-components";
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
} from "antd";
const { Text } = Typography;
import dayjs from "dayjs";
 import useFetchLots from "../../hooks/useFetchLots";
import { useSelector } from "react-redux";
import lotApi from "../../config/lotApi";

const createAuction = async (auctionData, lotList) => {
  try {
    const response = await lotApi.post("auctions", auctionData);
    console.log(response.data);
    console.log(response.data.auctionId);
    let cnt = 0;
    let newLotList = lotList.map(
      (item) =>
        (item = {
          auctionId: response.data.auctionId,
          auctionLotId: item.lotId,
          orderInAuction: ++cnt,
          duration: "00:30:00",
          stepPercent: 5,
        })
    );

    console.log(newLotList);
    const auctionLotRespone = await lotApi.post(
      "auction-lots/listAuctionLot",
      newLotList
    );
    console.log(auctionLotRespone.data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Auction.");
  }
};
export default function CreateAuctionPage() {
  const [formVariable] = useForm();
  const { lots, error, loading } = useFetchLots(2); //get lot list
  const [auctionLotList, setAuctionLotList] = useState([]);
  const [approvedLotSource, setApprovedLotSource] = useState();
  const { user } = useSelector((store) => store.user);

  // console.log(lots);

  useEffect(() => {
    if (lots.length > 0) {
      setApprovedLotSource(lots);
    }
  }, [lots]);

  // Disable past dates in form (at least 3 days from today)
  const disabledDate = (current) => {
    return current && current < dayjs().add(3, "day").endOf("day");
  };
  // Handle form submission for creating a new auction
  const handleSubmit = async (values) => {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "YYYY-MM-DD HH:mm:ss";
    // const today = dayjs().format(dateFormat);
    const newAuction = {
      staffId: user.UserId,
      hostDate: values.hostDate ? values.hostDate.format(dateFormat) : null,
      startTime: values.startTime.format(timeFormat),
    };

    //Call Api create new auction
    try {
      const response = await createAuction(newAuction, auctionLotList);
      message.success(response.statusText);
      handleReset();
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const handleClickCreate = () => {
    if (!auctionLotList.length) {
      message.error(
        "No lots selected! Please add at least one lot to the auction."
      );
      return;
    }
    formVariable.submit();
  };

  // Reset form and auction lot list
  const handleReset = () => {
    formVariable.resetFields();
    setAuctionLotList([]);
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
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
                <DatePicker disabledDate={disabledDate} />
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
                <TimePicker />
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
            />
            <LotSection
              title="Approved Lots"
              lotSource={auctionLotList}
              setLotSource={setAuctionLotList}
              auctionLotList={approvedLotSource}
              setAuctionLotList={setApprovedLotSource}
              operation="Add"
            />
          </div>
          <div className="button-container">
            <Button
              className="button"
              type="primary"
              onClick={handleClickCreate}
            >
              Create
            </Button>
            <Button
              className="button reset"
              type="primary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </>
      )}
    </>
  );
}
function LotSection({
  title,
  lotSource,
  setLotSource,
  auctionLotList,
  setAuctionLotList,
  operation,
}) {
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
        />
      </div>
    </div>
  );
}

function LotTable({
  getLotSource,
  setGetLotSource,
  giveLotSource,
  setGiveLotSource,
  operation,
}) {
  const columns = [
    {
      // title: "Lot",
      dataIndex: "lotId",
      key: "lotId",
      render: (_, record) => <LotCardRow lot={record} operation={operation} />,
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
    // console.log(`${operation} ${record.lot_id}`);
    setGetLotSource([...getLotSource, record]);
    setGiveLotSource((newGiveLotSource) =>
      newGiveLotSource.filter(
        (giveLotSource) => giveLotSource.lotId !== record.lotId
      )
    );
  };

  return <Table dataSource={giveLotSource} columns={columns} rowKey="lotId" />;
}

const LotCardRow = ({ lot }) => {
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
          </Col>
        </Row>
      </div>
    </>
  );
};
/*
1. call api tạo mới 1 auction vào Auction

2. call api thêm các lot trong auction vào AuctionLot
*/

/* Validation for new auction
Lot list is not empty 
Host Date is not in the past (Host Date is at least 3 days from today) 
*/

//khong throw error lam dung chuong trinh
