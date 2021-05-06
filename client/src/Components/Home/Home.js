import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import request from "../../graphQL/request";
import { TIMES } from "../../graphQL/queries";
import "./Home.css";
import { UserContext } from "../../context/UserContext";
import { FetchContext } from "../../context/FetchContext";
import TimesContainer from "../Timecard/TimesContainer";

function Home() {
  const [times, setTimes] = useState([]);
  let date = moment().format("YYYY-MM-DD");
  const currUser = useContext(UserContext);
  const { change } = useContext(FetchContext);

  useEffect(() => {
    request(TIMES, { creator: currUser.userId, date: date })
      .then((data) => {
        console.log(data);
        setTimes(data?.data?.times);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);
  // POWER BI --

  return (
    <div className="home_container">
      <TimesContainer date={date} times={times} />
    </div>
  );
}

export default Home;
