import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FetchContext } from "../../context/FetchContext";
import request from "../../graphQL/request";
import { ALL_TIMES, TIMES } from "../../graphQL/queries";
import { disabledDates } from "./functions";
import TimesContainer from "../Timecard/TimesContainer";

function CalendarTimes({ value, joinedAt, endDate }) {
  const currUser = useContext(UserContext);
  const { change } = useContext(FetchContext);
  const [times, setTimes] = useState([]);
  //console.log(value, endDate);
  useEffect(() => {
    // Don't make request to server if date = before joined date or after current date
    if (disabledDates(value, joinedAt)) return;
    else if (endDate !== value) {
      request(ALL_TIMES, { creator: currUser.userId })
        .then((data) => {
          setTimes(
            data.data.allTimes.filter(
              (time) => time.date >= value && time.date <= endDate
            )
          );
          console.log(times);
        })
        .catch((err) => console.log(err));
    }
    request(TIMES, {
      creator: currUser.userId,
      date: value,
    })
      .then((data) => {
        console.log(data);
        setTimes(data?.data?.times);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [value, change]);

  return (
    <div className="calendar_container_time">
      <TimesContainer
        date={value}
        endDate={endDate}
        times={times}
        setTimes={setTimes}
      />{" "}
    </div>
  );
}

export default CalendarTimes;
