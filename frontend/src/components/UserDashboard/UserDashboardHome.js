import React, {useEffect} from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import Home from "../UserDashboard-Components/Main/Home.js"
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";


const UserDashboardHome = () => {
    useEffect(() => {
        document.querySelector('.dashboard').classList.add('active');
        return () => {
            document.querySelector('.dashboard').classList.remove('active');
        };
    }, []);

    return (
      <>
        <div className="container">
          <Aside />
          <div></div>
          <main>
            <Home/>
          </main>
          <div></div>
          <Right />
        </div>
      </>
    );
  };
  

export default UserDashboardHome;
