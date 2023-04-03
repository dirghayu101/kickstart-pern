import React, {useEffect} from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import Support from "../UserDashboard-Components/Main/Support.js";
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";


const UserDashboardSupport = () => {
    useEffect(() => {
        document.querySelector('.support').classList.add('active')
        return () => {
            document.querySelector('.support').classList.remove('active');
        };
    }, []);

    return (
      <>
        <div className="container">
          <Aside />
          <div></div>
          <main>
            <Support/>
          </main>
          <div></div>
          <Right />
        </div>
      </>
    );
  };
  

export default UserDashboardSupport;
