import React from "react";
import { useEffect, useState } from "react";
import AllOrders from "./AllOrders";
import CurrentOrders from "./CurrentOrders";

// In orders admin should be able to modify recent reservation. Like delete and update. Even see all reservations ever and the users who performed all those.
const Orders = () => {
  const [showCurrentOrders, setShowCurrentOrders] = useState(true);

  function swapComponent() {
    setShowCurrentOrders(!showCurrentOrders);
  }

  useEffect(() => {
    document.querySelector(".orders").classList.add("active");
    return () => {
      document.querySelector(".orders").classList.remove("active");
    };
  }, []);

  const buttonText = showCurrentOrders
    ? "Show All Orders"
    : "Show Active Orders";

  return (
    <main>
      <button onClick={swapComponent}>{buttonText}</button>
      <br />
      <br />
      {showCurrentOrders ? <CurrentOrders /> : <AllOrders />}
      <br />
      <br />
      <br />
    </main>
  );
};

export default Orders;
