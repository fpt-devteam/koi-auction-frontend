import { useEffect, useState } from "react";
import { Table, Typography, Card, Tag } from "antd";
import "./styles.css";

const { Text } = Typography;

const TableComponent = ({ data, title = "Custom Table" }) => {
  const [tableData, setTableData] = useState(data);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const dataWithKeys = data.map((item, index) => ({
        ...item,
        key: item.id || `row-${index}`, // Thêm key cho mỗi dòng
      }));

      // Sắp xếp dữ liệu theo `updatedAt` (ngày gần nhất lên đầu)
      const sortedData = dataWithKeys.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      setTableData(sortedData);

      const customColumns = [
        {
          title: "Code",
          dataIndex: "sku",
          key: "sku",
          align: "center",
          render: (text) => (
            <Text strong style={{ fontSize: "16px", color: "#595959" }}>
              {text}
            </Text>
          ),
        },
        {
          title: "Winner (Name)",
          key: "winnerName",
          align: "center",
          render: (text, record) => (
            <Text style={{ fontWeight: "bold" }}>
              {record.winnerDto?.username || "N/A"}
            </Text>
          ),
        },
        {
          title: "Farm",
          key: "farmName",
          align: "center",
          render: (text, record) => (
            <Text style={{ fontWeight: "bold" }}>
              {record.breederDetailDto?.farmName || "N/A"}
            </Text>
          ),
        },
        {
          title: "Final Price",
          dataIndex: "finalPrice",
          key: "finalPrice",
          align: "center",
          render: (price) => {
            // const color = price > 500000 ? "#52c41a" : "#fa541c"; // Màu giá cao và thấp
            return (
              <Text style={{ fontWeight: "bold" }}>
                {price.toLocaleString()} VND
              </Text>
            );
          },
        },
        {
          title: "Lot Status",
          key: "lotStatusName",
          align: "center",
          render: (text, record) => {
            const statusColorMap = {
              Completed: "#52c41a", // Xanh lá cây
              Unsold: "#ff4d4f", // Đỏ
              Canceled: "#faad14", // Vàng cam
              "Payment Overdue": "#1890ff", // Xanh dương
            };
            return (
              <span
                style={{
                  backgroundColor:
                    statusColorMap[record.lotStatus?.lotStatusName] ||
                    "#d9d9d9",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                  padding: "5px 12px",
                  borderRadius: "20px", // Bo góc tròn
                  border: "none", // Loại bỏ viền
                  display: "inline-block",
                }}
              >
                {record.lotStatus?.lotStatusName || "No Status"}
              </span>
            );
          },
        },

        {
          title: "Date",
          dataIndex: "updatedLot",
          key: "updatedLot",
          align: "center",
          render: (date) => (
            <Text style={{ color: "#8c8c8c" }}>
              {new Date(date).toLocaleString()}
            </Text>
          ),
        },
      ];
      setColumns(customColumns);
    }
  }, [data]);

  if (!tableData || tableData.length === 0) {
    return (
      <Card title={title} className="chart-card">
        <div style={{ textAlign: "center" }}>No data available</div>
      </Card>
    );
  }

  return (
    <Card
      title={title}
      className="chart-card"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        size="middle"
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
        }}
        className="custom-table"
      />
    </Card>
  );
};

export default TableComponent;
