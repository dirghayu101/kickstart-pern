import React from "react";
import { useParams } from "react-router-dom";
import Aside from "../AdminDashboard-Components/Aside/Aside.js";
import Main from "../AdminDashboard-Components/Main/Main.js";
import Right from "../AdminDashboard-Components/Right/Right.js";
import AddProducts from "../AdminDashboard-Components/Main/AddProducts";
import Messages from "../AdminDashboard-Components/Main/Messages";
import Orders from "../AdminDashboard-Components/Main/Orders";
import Products from "../AdminDashboard-Components/Main/Products";
import Settings from "../AdminDashboard-Components/Main/Settings";
import Users from "../AdminDashboard-Components/Main/Users";
import "../UserDashboard/GeneralStyles/General.css";
import "../UserDashboard/GeneralStyles/Aside.css";
import "../UserDashboard/GeneralStyles/Main.css";
import "../UserDashboard/GeneralStyles/Right.css";
import "../UserDashboard/GeneralStyles/MediaQueries.css";

const AdminDashboard = () => {
  let { dashboardMenu } = useParams();

  let Component;
  if (dashboardMenu === "home") {
    Component = Main;
  } else if (dashboardMenu === "add") {
    Component = AddProducts;
  } else if (dashboardMenu === "feedback") {
    Component = Messages;
  } else if (dashboardMenu === "orders") {
    Component = Orders;
  } else if (dashboardMenu === "spaces") {
    Component = Products;
  } else if (dashboardMenu === "settings") {
    Component = Settings;
  } else if (dashboardMenu === "users") {
    Component = Users;
  } else {
    Component = () => <div>Error: Invalid dashboard menu</div>;
  }
  return (
    <>
      <div className="container">
        <Aside />
        <div></div>
        <Component />
        <div></div>
        <Right />
      </div>
    </>
  );
};

export default AdminDashboard;
