import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#0FADCF",
  "#3C50E0",
  "#8FD0EF",
  "#6577F3",
  "#FF6363",
  "#FFBB28",
];

const CustomLegend = ({ payload }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "2%",
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1% 1%",
            flexBasis: "35%",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: entry.color,
              borderRadius: "50%",
            }}
          ></span>
          <Typography.Text style={{ fontWeight: 600, fontSize: "14px" }}>
            {entry.value}
          </Typography.Text>
        </div>
      ))}
    </div>
  );
};

const PieChartComponent = ({
  data = [],
  dataKey = "value",
  // additionalDataKey = "value2",
  nameKey = "name",
  title = "Custom Pie Chart",
  colors = COLORS,
}) => {
  const [chartData, setChartData] = useState(data);

  // const [hoveredData, setHoveredData] = useState(null);
  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
      console.log("Data received:", data);
      console.log("ChartData updated:", data);
    }
  }, [data]);

  // Kiểm tra nếu chartData chưa có dữ liệu
  if (!chartData || chartData.length === 0) {
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
        width: "100%",
        height: "auto",
        borderRadius: "3%",
        boxShadow: "0 15px 10px rgba(0, 0, 0, 0.1)",
        padding: "1%",
        overflow: "hidden",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={150}
            paddingAngle={4}
            label={({ [dataKey]: value }) => `${value}%`}
            labelLine={true}
            dataKey={dataKey}
            nameKey={nameKey}
            isAnimationActive={false}
            animationDuration={500}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                style={{
                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, auctionMethodName, props) => {
              // Tooltip displays `name: count`
              const count = data.find(
                (item) =>
                  item.auctionMethodName === props.payload.auctionMethodName
              )?.count;
              return [`${count}`, `${props.payload.auctionMethodName}`];
            }}
            itemStyle={{ fontWeight: 500 }}
          />
          <Legend
            content={<CustomLegend />}
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.array,
  additionalDataKey: PropTypes.string,
  dataKey: PropTypes.string,
  nameKey: PropTypes.string,
  title: PropTypes.string,
  colors: PropTypes.array,
};

export default PieChartComponent;
