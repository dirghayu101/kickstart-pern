import React, {useEffect} from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import Order from "../UserDashboard-Components/Main/Order.js";
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css"
import "./GeneralStyles/Main.css"
import "./GeneralStyles/Right.css"
import "./GeneralStyles/MediaQueries.css";


const UserDashboardOrder = () => {
    useEffect(() => {
        document.querySelector('.orders').classList.add('active')
        return () => {
            document.querySelector('.orders').classList.remove('active');
        };
    }, []);

    return (
      <>
        <div className="container">
          <Aside />
          <div></div>
          <main>
            <Order/>
          </main>
          <div></div>
          <Right />
        </div>
      </>
    );
  };
  

export default UserDashboardOrder;
