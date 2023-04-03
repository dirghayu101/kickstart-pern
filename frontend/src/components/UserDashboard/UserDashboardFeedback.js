import React, {useEffect} from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import Feedback from "../UserDashboard-Components/Main/Feedback.js"
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";


const UserDashboardFeedback = () => {
    useEffect(() => {
        document.querySelector('.feedback').classList.add('active');
        return () => {
            document.querySelector('.feedback').classList.remove('active');
        };
    }, []);

    return (
      <>
        <div className="container">
          <Aside />
          <div></div>
          <main>
            <Feedback/>
          </main>
          <div></div>
          <Right />
        </div>
      </>
    );
  };
  

export default UserDashboardFeedback;
