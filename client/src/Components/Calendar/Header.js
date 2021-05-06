import React from "react";

export default function CalendarHeader({ value, onChange }) {
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }
  function prevMonthName() {
    return value.clone().subtract(1, "month").format("MMM");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }
  function nextMonthName() {
    return value.clone().add(1, "month").format("MMM");
  }
  return (
    <div className="header gradient">
      <div className="current">
        <div className="current_months">
          <h3 onClick={() => onChange(prevMonth())}>{prevMonthName()}</h3>
          <h1>{currMonthName()}</h1>
          <h3 onClick={() => onChange(nextMonth())}>{nextMonthName()}</h3>
        </div>
        <p>{currYear()}</p>
      </div>
    </div>
  );
}
