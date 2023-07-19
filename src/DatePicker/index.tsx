import "./index.css";
import React, { useState } from "react";

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    const newDate = new Date(dateValue);
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="datapicker-container">
      <input
        className="datapicker-input"
        type="date"
        value={selectedDate ? selectedDate.toJSON().slice(0, 10) : ""}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePicker;
