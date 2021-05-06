import React from "react";
import "./Sidebar.css";
import {
  FaCircleNotch,
  FaCalendarAlt,
  FaCog,
  FaClock,
  FaRegChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const signOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="sidebar_container">
      <div className="logo_container">
        <FaCircleNotch />
      </div>
      <div className="icon_container">
        <NavLink
          exact
          to="/"
          className="sidebar_icon"
          activeClassName="current_icon"
        >
          <FaClock />
        </NavLink>
        <NavLink
          to="/calendar"
          className="sidebar_icon"
          activeClassName="current_icon"
        >
          <FaCalendarAlt />
        </NavLink>
        <NavLink
          to="/statistics"
          className="sidebar_icon"
          activeClassName="current_icon"
        >
          <FaRegChartBar />
        </NavLink>
        <NavLink
          to="/settings"
          className="sidebar_icon"
          activeClassName="current_icon"
        >
          <FaCog />
        </NavLink>
      </div>
      <div className="signOut_btn">
        <NavLink to="/" className="sidebar_icon" onClick={signOut}>
          <FaSignOutAlt />
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
