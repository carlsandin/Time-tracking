import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Header from "./Header";
import CalendarTimes from "./CalendarTimes";
import "./Calendar.css";
import { buildCalendar, disabledDates } from "./functions";
import { UserContext } from "../../context/UserContext";

export default function Calendar({ value, onChange, change }) {
  const [calendar, setCalendar] = useState([]);
  const currUser = useContext(UserContext);
  const joinedAt = currUser.createdAt;

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

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

  return (
    <div className="calendar_container">
      <div className="calendar_container_calendar">
        <div className="calendar">
          <Header value={value} onChange={onChange} />

          <div className="body">
            <div className="test_weeks_container">
              {calendar.map((week, wi) => (
                <div key={wi} className="day_container">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="day"
                      onClick={() => {
                        if (
                          day < moment(joinedAt).startOf("day") ||
                          day > moment(new Date()).startOf("day")
                        )
                          return;
                        onChange(day);
                      }}
                    >
                      <div className={dayStyles(day)}>
                        {day.format("D").toString()}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CalendarTimes value={value} joinedAt={joinedAt} change={change} />
    </div>
  );
}

/*
 <div className="week">{day.isoWeekday()}</div>
<div className="day-names">
              {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((d, i) => (
                <div className="week" key={i}>
                  {d}
                </div>
              ))}
            </div> */
