// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { Card, Button, Space } from "antd";
// import PropTypes from "prop-types";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Đăng ký các thành phần biểu đồ
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // // Hàm tạo danh sách các ngày từ hôm nay lùi về 7 ngày trước, dựa trên offset
// // const getLast7Days = (offset = 0) => {
// //   const days = [];
// //   for (let i = 6; i >= 0; i--) {
// //     const date = new Date();
// //     date.setDate(date.getDate() - i - offset);
// //     days.push(
// //       date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
// //     );
// //   }
// //   return days;
// // };

// // // Hàm tạo dữ liệu ngẫu nhiên cho mỗi ngày
// // const generateRandomData = () =>
// //   Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 20);

// const MainLineChartComponent = ({ data, setFilterRevenueStatistics, title = "" }) => {
//   const [offset, setOffset] = useState(0);
//   // Xử lý khi nhấn nút Back
//   const handleBack = () => {
//     setOffset((prev) => prev + 7);

//     setRevenue()
//   };

//   // Xử lý khi nhấn nút Next
//   const handleNext = () => setOffset((prev) => (prev >= 7 ? prev - 7 : 0));

//   // Cấu hình biểu đồ
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {

//         display: true,
//         labels: {
//           color: "#333",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: "#555",
//           font: {
//             size: 12,
//           },
//         },
//       },
//       x: {
//         ticks: {
//           color: "#555",
//           font: {
//             size: 12,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <Card
//       title={title}
//       extra={<span>Last 7 Days</span>}
//       style={{
//         width: "100%",
//         maxWidth: "100%",
//         height: "auto", // Chiều cao của Card
//         margin: "20px auto",
//         borderRadius: 10,
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "600px", // Chiều cao cho phần chứa biểu đồ
//           padding: "10px",
//         }}
//       >
//         <div style={{ width: "80%", height: "100%" }}>
//           <Line data={data} options={options} />
//         </div>
//       </div>
//       <Space
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           marginBottom: "10px",
//         }}
//       >
//         <Button type="primary" onClick={handleBack}>
//           Back
//         </Button>
//         <Button type="primary" onClick={handleNext} disabled={offset === 0}>
//           Next
//         </Button>
//       </Space>
//     </Card>
//   );
// };
// MainLineChartComponent.propTypes = {
//   data: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.object),
//     PropTypes.object,
//   ]).isRequired,
//   title: PropTypes.string,
// };
// export default MainLineChartComponent;
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, Button, Space } from "antd";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainLineChartComponent = ({
  data,
  fetchData,
  title = "",
  extra = "",
}) => {
  const [offset, setOffset] = useState(0);

  // //console.log("data: ", data);
  // Gọi hàm fetchData khi offset thay đổi
  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  // // Xử lý khi nhấn nút Back
  // const handleBack = () => setOffset((prev) => prev);

  // // Xử lý khi nhấn nút Next
  // const handleNext = () => setOffset((prev) => (prev > 0 ? prev : 0));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <Card
      title={title}
      extra={<span>{extra}</span>}
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "auto",
        // margin: "20px auto",
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "410px",
          // padding: "10px",
        }}
      >
        <div style={{ width: "80%", height: "100%" }}>
          <Line data={data} options={options} style={{ width: "100%" }} />
        </div>
      </div>
      {/* {numBack == 1 && ( */}
      {/* <Space
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button type="primary" onClick={handleBack}>
          Back
        </Button>
        <Button type="primary" onClick={handleNext} disabled={offset === 0}>
          Next
        </Button>
      </Space> */}
      {/* )} */}
    </Card>
  );
};

MainLineChartComponent.propTypes = {
  data: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default MainLineChartComponent;
