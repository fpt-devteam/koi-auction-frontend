import React, { useState, useEffect } from "react";
import { Card, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import "./DateRangeCard.css"; // Import custom CSS

const { RangePicker } = DatePicker;

function DateRangeCard({ onDateChange }) {
  // Default start date 7 days before today, and end date as today
  const defaultEndDate = dayjs();
  const defaultStartDate = dayjs().subtract(7, "days");

  // Handle date change
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf("day");
      const endDate = dates[1].endOf("day");
      onDateChange(startDate, endDate); // Pass selected dates to parent component
    }
  };

  useEffect(() => {
    // Call onDateChange with default values on component mount
    onDateChange(defaultStartDate.startOf("day"), defaultEndDate.endOf("day"));
  }, []);

  return (
    <Card title="Select Date Range" style={{ width: 300 }}>
      <Space direction="vertical" size="middle">
        <RangePicker
          onChange={handleDateChange}
          format="MM-DD-YYYY"
          placeholder={["Start Date", "End Date"]}
          defaultValue={[defaultStartDate, defaultEndDate]}
          className="custom-range-picker" // Add custom class
        />
      </Space>
    </Card>
  );
}

export default DateRangeCard;
