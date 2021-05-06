import React, { useContext, useState } from "react";
import moment from "moment";
import "./Stopwatch.css";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import request from "../../graphQL/request";
import { CREATE_TIME } from "../../graphQL/mutations";
import { FetchContext } from "../../context/FetchContext";

function Stopwatch({ currentDate, userId, token }) {
  const { change, setChange } = useContext(FetchContext);

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [timeStatus, setTimeStatus] = useState(0);
  const [error, setError] = useState(null);
  let updateS = time.s,
    updateM = time.m,
    updateH = time.h;

  const endTime = moment(`Tue Apr 06 2021 ${startTime}`)
    .add(time.h, "hours")
    .add(time.m, "minutes")
    .add(time.s, "seconds")
    .format("HH:mm");

  const start = () => {
    setStartTime(moment().format("HH:mm"));
    setInterv(setInterval(updateTime, 1000));
    setTimeStatus(1);
  };

  const pause = () => {
    clearInterval(interv);
    setTimeStatus(0);
  };

  const stop = () => {
    if (title === "") {
      setError("You must have a title");
      return;
    }

    if (time.h === 0 && time.m === 0 && time.s === 0) {
      setError("Time can not be 0");
      return;
    }

    request(
      CREATE_TIME,
      {
        title: title,
        date: currentDate,
        creator: userId,
        project: project,
        startTime: startTime,
        endTime: endTime,
        h: time.h,
        m: time.m,
        s: time.s,
      },
      token
    )
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          setError(data.errors[0].message);
          return;
        }
        console.log(data);
        clearInterval(interv);
        setChange(!change);
        setTimeStatus(0);
        setTime({ s: 0, m: 0, h: 0 });
        setTitle("");
        setProject("");
        setStartTime(null);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };
  const updateTime = () => {
    if (updateS === 59) {
      updateM++;
      updateS = 0;
    }
    if (updateM === 59) {
      updateH++;
      updateM = 0;
    }
    updateS++;
    setTime({ s: updateS, m: updateM, h: updateH });
  };

  return (
    <div className="stopwatch_container">
      <input
        type="text"
        placeholder={error ? error : "What are you working on?"}
        autoComplete="off"
        spellCheck="false"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project?"
        autoComplete="off"
        spellCheck="false"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />
      <div className="stopwatch_time_container">
        <p className="stopwatch_time">{`${
          time.h >= 10 ? time.h : "0" + time.h
        }:${time.m >= 10 ? time.m : "0" + time.m}:${
          time.s >= 10 ? time.s : "0" + time.s
        }`}</p>
        {timeStatus ? (
          <div className="btn_container">
            <div className="stopwatch_btn pause">
              <FaPause onClick={pause} className="pause_btn" />
            </div>
            <div className="stopwatch_btn stop">
              <FaStop onClick={stop} className="stop_btn" />
            </div>
          </div>
        ) : (
          <div className="btn_container">
            <div className="stopwatch_btn play">
              <FaPlay onClick={start} className="play_btn" />
            </div>
            {time.s > 0 ? (
              <div className="stopwatch_btn stop">
                <FaStop onClick={stop} className="stop_btn" />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
