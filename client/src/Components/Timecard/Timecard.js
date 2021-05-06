import React, { useState } from "react";
import "./Timecard.css";
import { FaEdit } from "react-icons/fa";
import TimeModule from "./TimeModule";
// ADD DELETE TIME
function Timecard({ time }) {
  const [edit, setEdit] = useState(false);

  const showEdit = () => {
    setEdit(true);
  };
  const closeEdit = () => {
    setEdit(false);
  };
  return (
    <div className="timecard_container">
      {edit && <TimeModule time={time} setEdit={setEdit} />}
      {edit && <div className="backdrop" onClick={closeEdit}></div>}
      <p className="timecard_title">{time.title}</p>
      <p className="timecard_project">{time.project}</p>
      <p className="timecard_time">{`${time.h >= 10 ? time.h : "0" + time.h}:${
        time.m >= 10 ? time.m : "0" + time.m
      }:${time.s >= 10 ? time.s : "0" + time.s}`}</p>
      <div className="edit_timecard" onClick={showEdit}>
        <FaEdit />
      </div>
      <div className="timecard_clock">
        <p>{time.startTime}</p>
        <div></div>
        <p>{time.endTime}</p>
      </div>
    </div>
  );
}

export default Timecard;
