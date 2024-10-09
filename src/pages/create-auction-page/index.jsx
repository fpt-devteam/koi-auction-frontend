/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./index.css";
import { useForm } from "antd/es/form/Form";
import styled from "styled-components";
import {
  TimePicker,
  Form,
  Button,
  Input,
  DatePicker,
  Table,
  Popconfirm,
  message,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const lotSourceApi = "https://67026c37bd7c8c1ccd3ed26b.mockapi.io/AuctionLots";
const auctionSourceApi = "https://67026c37bd7c8c1ccd3ed26b.mockapi.io/Movie";

const fetchAuctionLots = async () => {
  try {
    const response = await axios.get(lotSourceApi);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load auction lots.");
  }
};

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
  const [auctionLotList, setAuctionLotList] = useState([]);
  const [approvedLotSource, setApprovedLotSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch auction lots with error handling and loading state
  useEffect(() => {
    const loadAuctionLots = async () => {
      try {
        setLoading(true);
        const lots = await fetchAuctionLots();
        setApprovedLotSource(lots);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadAuctionLots();
  }, []);

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
          {/* <LotListSection /s> */}
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
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
    },
    {
      title: "Operation",
      dataIndex: "Operation",
      render: (_, record) =>
        giveLotSource.length >= 1 ? (
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

  return <Table dataSource={giveLotSource} columns={columns} rowKey="lot_id" />;
}
// function LotListSection() {
//   const initialColumns = {
//     AuctionLot: {
//       id: "todo",
//       list: [],
//     },
//     ApprovedLot: {
//       id: "doing",
//       list: ["item 1", "item 2", "item 3"],
//     },
//   };
//   const [columns, setColumns] = useState(initialColumns);
//   return null;
//   const onDragEnd = ({ source, destination }: DropResult) => {
//     // Make sure we have a valid destination
//     if (destination === undefined || destination === null) return null;

//     // Make sure we're actually moving the item
//     if (
//       source.droppableId === destination.droppableId &&
//       destination.index === source.index
//     )
//       return null;

//     // Set start and end variables
//     const start = columns[source.droppableId];
//     const end = columns[destination.droppableId];

//     // If start is the same as end, we're in the same column
//     if (start === end) {
//       // Move the item within the list
//       // Start by making a new list without the dragged item
//       const newList = start.list.filter(
//         (_: any, idx: number) => idx !== source.index
//       );

//       // Then insert the item at the right location
//       newList.splice(destination.index, 0, start.list[source.index]);

//       // Then create a new copy of the column object
//       const newCol = {
//         id: start.id,
//         list: newList,
//       };

//       // Update the state
//       setColumns((state) => ({ ...state, [newCol.id]: newCol }));
//       return null;
//     } else {
//       // If start is different from end, we need to update multiple columns
//       // Filter the start list like before
//       const newStartList = start.list.filter(
//         (_: any, idx: number) => idx !== source.index
//       );

//       // Create a new start column
//       const newStartCol = {
//         id: start.id,
//         list: newStartList,
//       };

//       // Make a new end list array
//       const newEndList = end.list;

//       // Insert the item into the end list
//       newEndList.splice(destination.index, 0, start.list[source.index]);

//       // Create a new end column
//       const newEndCol = {
//         id: end.id,
//         list: newEndList,
//       };

//       // Update the state
//       setColumns((state) => ({
//         ...state,
//         [newStartCol.id]: newStartCol,
//         [newEndCol.id]: newEndCol,
//       }));
//       return null;
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <StyledColumns>
//         {Object.values(columns).map((col) => (
//           <Column col={col} key={col.id} />
//         ))}
//       </StyledColumns>
//     </DragDropContext>
//   );
// }
const StyledColumns = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const ColumnContainer = styled.div`
  background-color: #f0f0f0;
  padding: 16px;
  width: 300px;
  min-height: 200px;
  border-radius: 4px;
`;

const Item = styled.div`
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
`;

function LotListSection() {
  const initialData = [
    { id: "auctionLot", name: "auctionLot", items: [] },
    {
      id: "approvedLot",
      name: "approvedLot",
      items: [
        { id: "lot1", name: "lot1" },
        { id: "lot2", name: "lot2" },
      ],
    },
  ];
  // const initialColumns = {
  //   AuctionLot: {
  //     id: "AuctionLot",
  //     list: [],
  //   },
  //   ApprovedLot: {
  //     id: "ApprovedLot",
  //     list: initialData,
  //   },
  // };

  // const [columns, setColumns] = useState(initialColumns);
  const [stores, setStores] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there's no destination or source is the same as destination
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (startColumn === endColumn) {
      // Moving within the same column
      const updatedList = Array.from(startColumn.list);
      const [movedItem] = updatedList.splice(source.index, 1);
      updatedList.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [startColumn.id]: {
          ...startColumn,
          list: updatedList,
        },
      });
    } else {
      // Moving between different columns
      const startList = Array.from(startColumn.list);
      const [movedItem] = startList.splice(source.index, 1);
      const endList = Array.from(endColumn.list);
      endList.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [startColumn.id]: {
          ...startColumn,
          list: startList,
        },
        [endColumn.id]: {
          ...endColumn,
          list: endList,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {Object.values(columns).map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <ColumnContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{column.id}</h3>
                {column.list.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <Item
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item}
                      </Item>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ColumnContainer>
            )}
          </Droppable>
        ))}
      </StyledColumns>
    </DragDropContext>
  );
}
/* Validation for new auction
Name auction: #Aucxxx
Lot list is not empty 
Host Date is not in the past (Host Date is at least 3 days from today) 
*/
