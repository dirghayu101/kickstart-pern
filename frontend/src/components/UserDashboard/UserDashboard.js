import React from "react";
import Aside from "../UserDashboard-Components/Aside/Aside.js";
import Right from "../UserDashboard-Components/Right/Right.js";
import { useParams } from "react-router-dom";
import Main from "../UserDashboard-Components/Main/Main.js";
import Feedback from "../UserDashboard-Components/Main/Feedback";
import Home from "../UserDashboard-Components/Main/Home";
import Order from "../UserDashboard-Components/Main/Order";
import ReSchedule from "../UserDashboard-Components/Main/ReSchedule";
import Support from "../UserDashboard-Components/Main/Support";
import CartPage from "../UserDashboard-Components/Main/CartPage.js";
import "./GeneralStyles/General.css";
import "./GeneralStyles/Aside.css";
import "./GeneralStyles/Main.css";
import "./GeneralStyles/Right.css";
import "./GeneralStyles/MediaQueries.css";
import "./GeneralStyles/price-catalogue.css";
import "./GeneralStyles/cart-style.css";

const UserDashboard = () => {
  let { dashboardMenu } = useParams();
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  let Component;
  if (dashboardMenu === "spaces") {
    Component = !cartData || cartData.length === 0 ? Main : CartPage;
  } else if (dashboardMenu === "home") {
    Component = Home;
  } else if (dashboardMenu === "order") {
    Component = Order;
  } else if (dashboardMenu === "feedback") {
    Component = Feedback;
  } else if (dashboardMenu === "re-schedule") {
    Component = ReSchedule;
  } else if (dashboardMenu === "support") {
    Component = Support;
  } else if (dashboardMenu === "cart") {
    Component = !cartData || cartData.length === 0 ? Main : CartPage;
  } else {
    Component = () => <div>Error: Invalid dashboard menu</div>;
  }
  return (
    <>
      <div className="container">
        <Aside />
        <div></div>
        <main>
          <Component />
        </main>
        <div></div>
        <Right />
      </div>
    </>
  );
};

export default UserDashboard;
