import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Header from "./Header";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import CalendarTimes from "./CalendarTimes";
import "./Calendar.css";
import { buildCalendar, disabledDates } from "./functions";
import { UserContext } from "../../context/UserContext";

export default function Calendar({ value, change }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const currUser = useContext(UserContext);
  const joinedAt = currUser.createdAt;

  console.log(startDate);

  function isSelected(day) {
    // Check for selected date
    return value.isSame(day, "day");
  }

  function isToday(day) {
    // Check if current date
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    // Select classname
    if (disabledDates(day, joinedAt)) return "disabled";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    console.log(startDate);
    console.log(endDate);
  }

  return (
    <div className="calendar_container">
      <div className="calendar_container_calendar">
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleSelect}
          dateDisplayFormat={"yyyy-MM-dd"}
        />{" "}
      </div>{" "}
      <CalendarTimes
        value={moment(startDate).format("YYYY-MM-DD")}
        endDate={moment(endDate).format("YYYY-MM-DD")}
        joinedAt={joinedAt}
        change={change}
      />{" "}
    </div>
  );
}
