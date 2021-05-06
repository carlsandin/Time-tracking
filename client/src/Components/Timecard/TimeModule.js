import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import request from "../../graphQL/request";
import { FetchContext } from "../../context/FetchContext";
import moment from "moment";
import { CREATE_TIME, UPDATE_TIME } from "../../graphQL/mutations";
import { UserContext } from "../../context/UserContext";

function EditTimecard({ time, setEdit, date }) {
  const currUser = useContext(UserContext);
  const [error, setError] = useState(null);
  const { change, setChange } = useContext(FetchContext);

  const [title, setTitle] = useState(time ? time.title : "");
  const [project, setProject] = useState(time ? time.project : "");
  const [hours, setHours] = useState(time ? time.h : 0);
  const [minutes, setMinutes] = useState(time ? time.m : 0);
  const [seconds, setSeconds] = useState(time ? time.s : 0);
  const [startTime, setStartTime] = useState(time ? time.startTime : "00:00");
  const timeDate = time?.date;
  const endTime = moment(`Tue Apr 06 2021 ${startTime}`)
    .add(hours, "hours")
    .add(minutes, "minutes")
    .format("HH:mm");

  const closeEdit = () => {
    setEdit(false);
  };

  console.log(time?._id, timeDate);

  const updateTime = () => {
    if (title === "") {
      setError("You must have a title");
      return;
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setError("Time can not be 0");
      return;
    }

    request(UPDATE_TIME, {
      id: time._id,
      title: title,
      date: timeDate,
      creator: currUser.userId,
      project: project,
      startTime: startTime,
      endTime: endTime,
      h: parseInt(hours),
      m: parseInt(minutes),
      s: parseInt(seconds),
    })
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          setError(data.errors[0].message);
          return;
        }
        console.log(data);
        setChange(!change);
        setTitle("");
        setProject("");
        setStartTime(null);
        setError(null);
        closeEdit();
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const addTime = () => {
    if (title === "") {
      setError("You must have a title");
      return;
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setError("Time can not be 0");
      return;
    }

    request(
      CREATE_TIME,
      {
        title: title,
        date: date,
        creator: currUser.userId,
        project: project,
        startTime: startTime,
        endTime: endTime,
        h: parseInt(hours),
        m: parseInt(minutes),
        s: parseInt(seconds),
      },
      currUser.token
    )
      .then((data) => {
        if (data.errors) {
          console.log(data.errors);
          setError(data.errors[0].message);
          return;
        }
        console.log(data);
        setChange(!change);
        setTitle("");
        setProject("");
        setStartTime(null);
        setError(null);
        closeEdit();
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  const deleteTime = () => {
    request(
      `mutation delete($id: ID!){
      deleteTime(id: $id)
    }`,
      { id: time?._id }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setChange(!change);
    setEdit(false);
  };

  return (
    <div className="module_timecard_container">
      {error && <div className="error">{error}</div>}
      <div className="module_input_container">
        <label>Title*</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="module_input_container">
        <label>Project</label>
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </div>
      <div className="module_time_container">
        <div className="module_input_container">
          <label>Hours</label>
          <input
            type="number"
            value={hours}
            min="0"
            max="24"
            onChange={(e) => setHours(parseInt(e.target.value))}
          />
        </div>
        <div className="module_input_container">
          <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            min="0"
            max="59"
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          />
        </div>
        <div className="module_input_container">
          <label>Seconds</label>
          <input
            type="number"
            value={seconds}
            min="0"
            max="59"
            onChange={(e) => setSeconds(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="module_time_container">
        <div className="module_input_container">
          <label>From</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="module_input_container">
          <label>To</label>
          <input type="time" value={endTime} disabled={true} />
        </div>
      </div>
      <div className="module_btn_container">
        <button className="module_btn" onClick={closeEdit}>
          Cancel
        </button>
        <button className="module_btn" onClick={time ? updateTime : addTime}>
          {time ? "Save" : "Add Time"}
        </button>
      </div>
      {time && (
        <div className="module_btn module_delete_time" onClick={deleteTime}>
          <FaTrash />
          Delete
        </div>
      )}
    </div>
  );
}

export default EditTimecard;
