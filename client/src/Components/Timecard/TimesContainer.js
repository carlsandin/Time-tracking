import React, { useEffect, useState } from "react";
import Timecard from "./Timecard";
import "./Timecard.css";
import { countTotalTime } from "../Home/functions";
import { FaPlusSquare, FaSearch } from "react-icons/fa";
import TimeModule from "./TimeModule";

function TimesContainer({ date, times, endDate }) {
  const [totalTime, setTotalTime] = useState(0);
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState(false);
  if (endDate === undefined) endDate = date;
  const twoDates = date !== endDate ? true : false;

  const showEdit = () => {
    setEdit(true);
  };
  const closeEdit = () => {
    setEdit(false);
  };

  useEffect(() => {
    setTotalTime(
      countTotalTime(
        times.filter((time) => {
          if (query === "") return time;
          if (searchFilter) {
            return (
              !time.title.toLowerCase().includes(query) ||
              !time.project.toLowerCase().includes(query)
            );
          } else {
            return (
              time.title.toLowerCase().includes(query) ||
              time.project.toLowerCase().includes(query)
            );
          }
        })
      )
    );
  }, [times, query]);

  return (
    <div className="time_container">
      {edit && <TimeModule setEdit={setEdit} date={date} />}
      {edit && <div className="backdrop" onClick={closeEdit}></div>}
      {times.length > 6 || query !== "" ? (
        <div className="search_container">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className="search_times container"
          />
          <FaSearch className="search_icon" />
        </div>
      ) : null}
      <div className="add_time">
        <h1 className="home_date">
          {twoDates ? `${date} / ${endDate}` : date}
        </h1>
        {!twoDates && <FaPlusSquare className="plus" onClick={showEdit} />}
      </div>
      <div className="time_container">
        {times.length > 0 && !twoDates
          ? times
              .sort((a, b) =>
                a.startTime > b.startTime
                  ? 1
                  : b.startTime > a.startTime
                  ? -1
                  : 0
              )
              .map((time) => <Timecard time={time} key={time._id} />)
          : times.length > 0 && twoDates
          ? times
              .filter((time) => {
                if (query === "") return time;
                if (searchFilter) {
                  return (
                    !time.title.toLowerCase().includes(query) ||
                    !time.project.toLowerCase().includes(query)
                  );
                } else {
                  return (
                    time.title.toLowerCase().includes(query) ||
                    time.project.toLowerCase().includes(query)
                  );
                }
              })
              .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
              .map((time) => (
                <Timecard time={time} key={time._id} twoDates={twoDates} />
              ))
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
