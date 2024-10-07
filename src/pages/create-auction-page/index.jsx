/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import {
  TimePicker,
  Form,
  Button,
  Input,
  DatePicker,
  Table,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

export default function CreateAuctionPage() {
  const auctionNamePattern = /^#Auc\d{3}$/;
  const [formVariable] = useForm();
  const [auctionLotList, setAuctionLotList] = useState([]);
  const [approvedLotSource, setApprovedLotSource] = useState([
    {
      key: "lot_id_1",
      lot_id: "KoKoDuDu",
    },
    {
      key: "lot_id_2",
      lot_id: "Kudoqn",
    },
  ]);
  const disabledDate = (current) => {
    return current && current < dayjs().add(3, "day").endOf("day");
  };
  const handleSubmit = async (values) => {
    const dateFormat = "YYYY-MM-DD";
    const timeFormat = "YYYY-MM-DD HH:mm:ss";

    const today = dayjs().format(dateFormat);
    // console.log(values);
    // console.log(auctionLotList);
    // console.log(today);
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
    console.log(newAuction);

    //post
    try {
      //   const response = await lotApi.post("user-service/login", {
      //     auctionId: "testAuctionId",
      //     auctionName: values.auctionName,
      //     staffId: "testStaff",
      //     hostDate: values.hostDate ? values.hostDate.format("YYYY-MM-DD") : null,
      //     startTime: values.startTime,
      //     createAt: today,
      //     updateAt: today,
      //     lotList: auctionLotList,
      //   });

      alert("Auction created successfully!");
      //reset
      handleReset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleClickCreate = () => {
    if (!auctionLotList.length) {
      alert("No lots selected! Please add at least one lot to the auction.");
      return;
    }
    formVariable.submit();
  };
  const handleReset = () => {
    formVariable.resetFields();
    setAuctionLotList([]);
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
        {/* New Auction Lots Section */}
        <div className="lots-section">
          <h2>Auction Lots</h2>
          <div className="table-container">
            <LotTable
              getLotSource={approvedLotSource}
              setGetLotSource={setApprovedLotSource}
              giveLotSource={auctionLotList}
              setGiveLotSource={setAuctionLotList}
              operation={"Remove"}
            />
          </div>
        </div>

        {/* Approved Lots Section */}
        <div className="lots-section">
          <h2>Approved Lots</h2>
          <div className="table-container">
            <LotTable
              getLotSource={auctionLotList}
              setGetLotSource={setAuctionLotList}
              giveLotSource={approvedLotSource}
              setGiveLotSource={setApprovedLotSource}
              operation={"Add"}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button className="button" type="primary" onClick={handleClickCreate}>
          Create
        </Button>
        <Button className="button reset" type="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
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
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
    },
    {
      title: "Operation",
      dataIndex: "Operation",
      render: (_, record) =>
        giveLotSource && giveLotSource.length ? (
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleOperation(record)}
          >
            <a>{operation}</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleOperation = (record) => {
    console.log(`${operation} ${record.lot_id}`);
    setGetLotSource([...getLotSource, record]);
    setGiveLotSource((newGiveLotSource) =>
      newGiveLotSource.filter(
        (giveLotSource) => giveLotSource.lot_id !== record.lot_id
      )
    );
  };

  return <Table dataSource={giveLotSource} columns={columns} />;
}
/*
validate
Name auction: #Aucxxx
check list lot empty (done)
Date and Time check is not past (chỉ được đặt từ 3 ngày sau hôm nay) (download dayjs) (done)

auction api trong config
auction router
//
fetch data
*/
