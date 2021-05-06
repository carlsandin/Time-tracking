import React, { useContext, useEffect, useState } from "react";
import Timecard from "./Timecard";
import "./Timecard.css";
import { countTotalTime } from "../Home/functions";
import { FaPlusSquare } from "react-icons/fa";
import TimeModule from "./TimeModule";
import { UserContext } from "../../context/UserContext";
import { disabledDates } from "../Calendar/functions";

function TimesContainer({ date, times }) {
  const currUser = useContext(UserContext);
  const [totalTime, setTotalTime] = useState(0);
  const [edit, setEdit] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };
  const closeEdit = () => {
    setEdit(false);
  };
  useEffect(() => {
    setTotalTime(countTotalTime(times));
  }, [times]);
  return (
    <div className="time_container">
      {edit && <TimeModule setEdit={setEdit} date={date} />}
      {edit && <div className="backdrop" onClick={closeEdit}></div>}
      <div className="add_time">
        <h1 className="home_date">{date}</h1>
        {!disabledDates(date, currUser.createdAt) && (
          <FaPlusSquare className="plus" onClick={showEdit} />
        )}
      </div>
      <div className="time_container">
        {times.length > 0
          ? times
              .sort((a, b) =>
                a.startTime > b.startTime
                  ? 1
                  : b.startTime > a.startTime
                  ? -1
                  : 0
              )
              .map((time) => <Timecard time={time} key={time._id} />)
          : null}
      </div>
      {times.length > 0 ? (
        <div className="timecard_container total_time_container">
          <div></div>
          <div></div>
          <p className="timecard_time total_time">{totalTime}</p>
          <div></div>
        </div>
      ) : null}
    </div>
  );
}

export default TimesContainer;
