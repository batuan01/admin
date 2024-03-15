import { useState } from "react";

export const DateForm = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="date" className="text-gray-600">
        Select Date:
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="border rounded p-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
