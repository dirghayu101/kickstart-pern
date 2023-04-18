import React from "react";
import { useState, useEffect } from "react";
import ActiveOrders from "./ActiveOrders";
import PastOrders from "./PastOrders";
import "./Order.css"

const Order = () => {
  const [showActiveOrders, setShowActiveOrders] = useState(true)

  useEffect(() => {
    document.querySelector('.orders').classList.add('active')
    return () => {
      document.querySelector('.orders').classList.remove('active');
  };
  }, []);

  function swapComponent(){
    setShowActiveOrders(!showActiveOrders)
  }

  const buttonText = showActiveOrders ? "Show Past Orders" : "Show Active Orders"


  return (
    <>
    <button id="dashboardSwitchButton" onClick={swapComponent}>{buttonText}</button>
    <br/>
    <br/>
    {showActiveOrders?<ActiveOrders/>:<PastOrders/>}
    </>
  );
};

export default Order;
