import { useState } from "react";

export const DateForm = ({ selectedDate, setSelectedDate, label }) => {
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="date" className="text-[#252F4A] font-semibold text-sm">
        {label}
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border border-stone-400 rounded-sm p-2 h-10 focus:outline-none focus:border-blue-500 "
      />
    </div>
  );
};

export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Thêm số 0 đằng trước nếu cần
  const day = String(currentDate.getDate()).padStart(2, "0"); // Thêm số 0 đằng trước nếu cần
  return `${year}-${month}-${day}`;
}