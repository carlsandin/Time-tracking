import React, { useState } from "react";
import "./App.css";
import Stopwatch from "./Components/Stopwatch/Stopwatch";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Calendar from "./Components/Calendar/Calendar";
import Statistics from "./Components/Statistics/Statistics";
import moment from "moment";
import Login from "./Components/Register/Login";
import { UserContext } from "./context/UserContext";
import { FetchContext } from "./context/FetchContext";
import Settings from "./Components/Settings/Settings";

function App() {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [change, setChange] = useState(false);
  const currentDate = moment().format("YYYY-MM-DD");
  const currUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : undefined;

  return currUser?.token ? (
    <UserContext.Provider value={currUser}>
      <Router>
        <div className="app_body">
          <Sidebar />
          <FetchContext.Provider value={{ change, setChange }}>
            <Stopwatch
              currentDate={currentDate}
              userId={currUser.userId}
              token={currUser.token}
            />
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/calendar"
              component={() => (
                <Calendar value={selectedDate} onChange={setSelectedDate} />
              )}
            />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/settings" component={Settings} />
          </FetchContext.Provider>
        </div>
      </Router>
    </UserContext.Provider>
  ) : (
    <Login />
  );
}

export default App;
