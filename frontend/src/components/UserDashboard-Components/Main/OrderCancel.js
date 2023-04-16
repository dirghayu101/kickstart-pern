import { useState, useEffect } from "react";
import axios from "axios";
import "./OrderCancel.css";
import SpaceInstruction from "./SpaceInstruction";

/*
In case a user cancels an order, these should happen:
1. User should not be able to cancel the order if only 12 hours are left for the reservation to start.
2. User will be asked to provide a reason for cancelling his order.
3. The reason will be posted to the feedback table and with some header like reservation cancelled. 
*/

const spaceImages = {
  "Conference-Room": "/images/dashboard-assets/conferenceRoom.webp",
  "Private-Office": "/images/dashboard-assets/privateOffice.webp",
  "Hot-Seat": "/images/dashboard-assets/hotSeat.webp",
  Cubicle: "/images/dashboard-assets/cubicle.webp",
};

const OrderCancel = (reservation) => {
  const [sendFeedback, setSendFeedback] = useState(false);
  const {
    space,
    bookingTime,
    reservationDate,
    spacePrice,
    wasMuted,
    reservationID: rID,
  } = reservation;
  useEffect(() => {
    console.log(reservation);
    document.querySelector(".support").classList.add("active");
    return () => {
      document.querySelector(".support").classList.remove("active");
    };
  }, []);

  function hoursUntil(date) {
    const parts = date.split("/");
    const targetDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return hoursDiff;
  }

  const cancelRequest = async () => {
    if (wasMuted) {
      alert(
        "Request cannot be processed as the reservation has been modified once. Contact the admin for further details."
      );
      return;
    }
    console.log("Hours until: ", hoursUntil(reservationDate));
    if (hoursUntil(reservationDate) < 12) {
      alert(
        "Cancel request cannot be processed 12 hours before reservation. Contact the admin."
      );
      return;
    }
    await cancelOrder();
    // window.location.reload();
  };

  const cancelOrder = async () => {
    const deleteURL = `http://localhost:3500/api/v1/user/reserve/${rID}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.delete(deleteURL);
      if (response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error: ", error.response.data.message);
    }
  };

  const navigateBack = () => {
    window.location.reload();
  };

  const loadForm = () => {
    setSendFeedback(true);
  };

  return (
    <>
      {sendFeedback ? (
        <SpaceInstruction />
      ) : (
        <>
          <div id="orderCancelStyle">
            <h1>Reservation Information</h1>
            <img src={spaceImages[space]} alt={space} />
            <table>
              <tbody>
                <tr>
                  <th>Space</th>
                  <td>{space}</td>
                </tr>
                <tr>
                  <th>Booking Time</th>
                  <td>{bookingTime}</td>
                </tr>
                <tr>
                  <th>Reservation Date</th>
                  <td>{reservationDate}</td>
                </tr>
                <tr>
                  <th>Amount Paid</th>
                  <td>{spacePrice}</td>
                </tr>
                <tr>
                  <th>Seat Was Updated</th>
                  <td>{wasMuted ? "Yes" : "No"}</td>
                </tr>
              </tbody>
            </table>
            <div id="orderCancelBtns">
              <button id="requestService" onClick={loadForm}>
                Add Instruction
              </button>
              <button id="cancelReservation" onClick={cancelRequest}>
                Cancel Order
              </button>
            </div>
          </div>
          <div id="outerNavigateCancel" onClick={navigateBack}>
            <button id="navigateToSupport">{"<"}Go back</button>
          </div>
        </>
      )}
    </>
  );
};

export default OrderCancel;
