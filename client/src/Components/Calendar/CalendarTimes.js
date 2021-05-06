import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { FetchContext } from "../../context/FetchContext";
import request from "../../graphQL/request";
import { TIMES } from "../../graphQL/queries";
import { disabledDates } from "./functions";
import TimesContainer from "../Timecard/TimesContainer";

function CalendarTimes({ value, joinedAt }) {
  const currUser = useContext(UserContext);
  const { change } = useContext(FetchContext);
  const [times, setTimes] = useState([]);
  useEffect(() => {
    // Don't make request to server if date = before joined date or after current date
    if (disabledDates(value, joinedAt)) return;
    request(TIMES, {
      creator: currUser.userId,
      date: value.format("YYYY-MM-DD").toString(),
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
        date={value.format("YYYY-MM-DD").toString()}
        times={times}
      />
    </div>
  );
}

export default CalendarTimes;
