import React, { useContext } from "react";
import "./Settings.css";
import { UserContext } from "../../context/UserContext";

function Settings() {
  const currUser = useContext(UserContext);
  console.log(currUser);
  return (
    <div className="settings_container">
      <h2>Settings</h2>
      <p>{currUser.displayName}</p>
      <p>{currUser.email}</p>
    </div>
  );
}

export default Settings;
