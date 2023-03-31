import React from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Main from "../UserDashboard-Components/Main/Main.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";

const UserDashboard = () => {
  return (
    <>
      <div class="container">
        <Aside />
        <div></div>
        <Main />
        <div></div>
        <Right />
      </div>
    </>
  );
};

export default UserDashboard;
