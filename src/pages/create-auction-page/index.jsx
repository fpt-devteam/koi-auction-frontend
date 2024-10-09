/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
// import styled from "styled-components";
import {
  TimePicker,
  Form,
  Button,
  Input,
  DatePicker,
  Table,
  Popconfirm,
  message,
  Row,
  Col,
  Image,
  Typography,
  Modal,
} from "antd";
const { Text } = Typography;
import dayjs from "dayjs";
import axios from "axios";
import useFetchLots from "../../hooks/useFetchLots";
import Card from "antd/es/card/Card";
import LotDetailPage from "../lot-detail-page";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const auctionSourceApi = "https://67026c37bd7c8c1ccd3ed26b.mockapi.io/Movie";

const createAuction = async (auctionData) => {
  try {
    const response = await axios.post(auctionSourceApi, auctionData);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create Auction.");
  }
};
export default function CreateAuctionPage() {
  const auctionNamePattern = /^#Auc\d{3}$/;
  const [formVariable] = useForm();
  const { lots, error } = useFetchLots(2); //get lot list
  const [auctionLotList, setAuctionLotList] = useState([]);
  const [approvedLotSource, setApprovedLotSource] = useState();
  const [loading, setLoading] = useState(false);
  const [err, serErr] = useState(error);

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
    const today = dayjs().format(dateFormat);
    const newAuction = {
      auctionId: "testAuctionId",
      auctionName: values.auctionName,
      staffId: "testStaff",
      hostDate: values.hostDate ? values.hostDate.format(dateFormat) : null,
      startTime: values.startTime.format(timeFormat),
      createAt: today,
      updateAt: today,
      lotList: auctionLotList,
    };
    // console.log("Data of new auction: " + newAuction);

    //Call Api create new auction
    try {
      const response = await createAuction(newAuction);
      message.success(response.statusText);
      handleReset();
    } catch (error) {
      console.log(error);
      message.error("Failed to create Auction.");
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
                name={"auctionName"}
                label={"Auction Name"}
                rules={[
                  {
                    required: true,
                    message: "Please enter name auction",
                  },
                  {
                    pattern: auctionNamePattern,
                    message: "Auction name must be #Aucxxx",
                  },
                ]}
              >
                <Input className="form-item-input" />
              </Form.Item>{" "}
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
  // console.log(operation + "Long");
  console.log(giveLotSource);
  // return null;
  const columns = [
    {
      // title: "Lot",
      dataIndex: "lotId",
      key: "lotId",
      render: (_, record) => <LotCardRow lot={record} operation={operation} />,
    },
    // {
    //   title: "Operation",
    //   dataIndex: "Operation",
    //   render: (_, record) =>
    //     giveLotSource.length >= 1 ? (
    //       <Popconfirm
    //         title="Are you sure?"
    //         onConfirm={() => handleOperation(record)}
    //       >
    //         <a>{operation}</a>
    //       </Popconfirm>
    //     ) : null,
    // },
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

/* Validation for new auction
Name auction: #Aucxxx
Lot list is not empty 
Host Date is not in the past (Host Date is at least 3 days from today) 
*/
//khong throw error

const LotCardRow = ({ lot, operation }) => {
  let iconContent = "+";
  let iconColor = "default";
  if (operation == "Delete") {
    iconContent = "-";
    iconColor = "danger";
  }
  return (
    <>
      <Card
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

          {/* View Button */}
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* Nút Remove với Popconfirm để xác nhận xóa */}
            <Popconfirm
              title="Are you sure to delete this item?"
              // onConfirm={handleLotDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" color={iconColor} shape="circle">
                {iconContent}
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Card>
    </>
  );
};
