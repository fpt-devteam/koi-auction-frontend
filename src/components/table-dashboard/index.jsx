import { useEffect, useState } from "react";
import { Table, Typography, Avatar, Card, Tag } from "antd";
import "./styles.css";
import PropTypes from "prop-types";
import { priorityMap } from "../../helpers/priorityMap";
const { Text } = Typography;

const TableComponent = ({ data, title = "Custom Table" }) => {
  const [tableData, setTableData] = useState(data);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (data && data.length > 0) {
      // Thêm key vào từng hàng dữ liệu
      const dataWithKeys = data.map((item, index) => ({
        ...item,
        key: item.id || `row-${index}`, // Sử dụng `id` nếu có, nếu không thì dùng `index`
      }));
      setTableData(dataWithKeys);

      const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      // Tạo cột động dựa trên key của phần tử đầu tiên
      const customColumns = [
        {
          title: "Farm",
          dataIndex: "farmName",
          key: "farmName",
          align: "center", // Center align this column
          render: (text, record) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                className="custom-avatar"
                style={{
                  backgroundColor: getRandomColor(),
                  marginRight: "10%",
                }}
              >
                {text[0]}
              </Avatar>
              <div>
                <Text strong style={{ fontSize: "18px", color: "#8c8c8c" }}>
                  {text}
                </Text>
                <div
                  style={{
                    fontSize: "18px",
                    color: "#8c8c8c",
                    alignItems: "center",
                  }}
                >
                  {record.role}
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Success",
          dataIndex: "percentSuccess",
          key: "percentSuccess",
          align: "center", // Center align this column
          render: (text) => (
            <Text strong style={{ fontSize: "18px", color: "#8c8c8c" }}>
              {text}%
            </Text>
          ),
        },
        {
          title: "Unsold",
          dataIndex: "percentUnsold",
          key: "percentUnsold",
          align: "center", // Center align this column
          render: (text) => (
            <Text strong style={{ fontSize: "18px", color: "#8c8c8c" }}>
              {text}%
            </Text>
          ),
        },
        {
          title: "Canceled",
          dataIndex: "percentCancelledSoldLot",
          key: "percentCancelledSoldLot",
          align: "center", // Center align this column
          render: (text) => (
            <Text strong style={{ fontSize: "18px", color: "#8c8c8c" }}>
              {text}%
            </Text>
          ),
        },

        {
          title: "Priority",
          dataIndex: "priority",
          key: "priority",
          align: "center",
          render: (priorityValue) => {
            // Chuyển đổi priority từ số sang chuỗi mô tả bằng priorityMap
            const priority = priorityMap[priorityValue] || "Unknown";
            let color = "";

            // Áp dụng màu sắc tùy thuộc vào mức độ ưu tiên
            switch (priority) {
              case "Low":
                color = "#FF4C4C";
                break;
              case "Medium":
                color = "#00C1D4";
                break;
              case "High":
                color = "#FF7F50";
                break;
              // case "Very Low":
              //   color = "#FF4C4C";
              //   break;
              default:
                color = "grey";
            }
            return (
              <Tag
                color={color}
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  textAlign: "center",
                  minWidth: "80px",
                }}
              >
                {priority}
              </Tag>
            );
          },
        },
      ];
      setColumns(customColumns); // Chỉ sử dụng các cột đã tùy chỉnh
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
      style={{ boxShadow: "0 15px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <Table
        columns={columns}
        dataSource={tableData}
        bordered
        size="small"
        pagination={{
          pageSize: 6, // Cố định số dòng mỗi trang là 6
          showSizeChanger: false, // Tắt tùy chọn thay đổi số dòng trên mỗi trang
        }}
        rowKey="farm" // Đặt giá trị unique cho mỗi dòng
        className="custom-table-header"
      />
    </Card>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      farmName: PropTypes.string.isRequired, // Định nghĩa các thuộc tính và kiểu dữ liệu mong muốn
      percentUnsold: PropTypes.number.isRequired,
      percentCancelledSoldLot: PropTypes.number.isRequired,
      percentSuccess: PropTypes.number.isRequired,
      percentUnsuccess: PropTypes.number.isRequired,
      priority: PropTypes.number.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};
export default TableComponent;
