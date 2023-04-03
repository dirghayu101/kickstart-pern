import React, {useEffect} from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import ReSchedule from "../UserDashboard-Components/Main/ReSchedule.js"
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";


const UserDashboardReSchedule = () => {
    useEffect(() => {
        document.querySelector('.reschedule').classList.add('active');
        return () => {
            document.querySelector('.reschedule').classList.remove('active');
        };
    }, []);

    return (
      <>
        <div className="container">
          <Aside />
          <div></div>
          <main>
            <ReSchedule/>
          </main>
          <div></div>
          <Right />
        </div>
      </>
    );
  };
  

export default UserDashboardReSchedule;
