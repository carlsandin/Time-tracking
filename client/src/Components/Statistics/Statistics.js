import React, { useContext, useEffect, useState } from "react";
import "./Statistics.css";
import { UserContext } from "../../context/UserContext";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./Charts/DoughnutChart";
import LineChart from "./Charts/LineChart";
import request from "../../graphQL/request";
import { ALL_TIMES } from "../../graphQL/queries";
import { monthOptions } from "./functions";
import { FetchContext } from "../../context/FetchContext";
import moment from "moment";

import { chartData } from "./functions";

function Statistics() {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { change } = useContext(FetchContext);
  const currUser = useContext(UserContext);
  const [month, setMonth] = useState("");
  const dates = times.filter((time) => time.date.startsWith(month));

  const barData = {
    labels: chartData(dates, "bar").labels,
    datasets: [
      {
        label: "Total hours (Day)",
        data: chartData(dates, "bar").data,
        backgroundColor: "#2f2f2f",
        borderColor: "#4f4f4f",
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: chartData(dates, "doughnut").labels,
    datasets: [
      {
        label: "Total hours (Project)",
        data: chartData(dates, "doughnut").data,
        backgroundColor: "#2f2f2f",
        borderColor: "#eee",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setLoading(true);
    setMonth(moment().format("YYYY-MM"));
    request(ALL_TIMES, { creator: currUser.userId })
      .then((data) => {
        setTimes(data.data.allTimes);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [change]);

  return (
    <div className="stats_container">
      <div className="chart_container bar_container">
        <div className="chart_options">
          <p>Month</p>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {monthOptions(times).map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="loading"></div>
        ) : (
          <BarChart
            times={times}
            setLoading={setLoading}
            month={month}
            data={barData}
          />
        )}
      </div>
      {loading ? (
        <div className="chart_container">
          <div className="loading"></div>
        </div>
      ) : (
        <DoughnutChart
          times={times}
          setLoading={setLoading}
          month={month}
          data={doughnutData}
        />
      )}
      <LineChart times={times} />
    </div>
  );
}

export default Statistics;
