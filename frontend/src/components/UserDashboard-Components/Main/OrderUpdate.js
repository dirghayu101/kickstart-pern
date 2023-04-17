import { useState, useEffect } from "react";
import axios from "axios";
import "./OrderCancel.css";
import "./OrderUpdate.css";

const spaceImages = {
  "Conference-Room": "/images/dashboard-assets/conferenceRoom.webp",
  "Private-Office": "/images/dashboard-assets/privateOffice.webp",
  "Hot-Seat": "/images/dashboard-assets/hotSeat.webp",
  Cubicle: "/images/dashboard-assets/cubicle.webp",
};

const OrderUpdate = (reservation) => {
  const {
    space,
    bookingTime,
    reservationDate,
    spacePrice,
    wasMuted,
    reservationID: rID,
  } = reservation;

  const [newDate, setNewDate] = useState(convertDateFormat(reservationDate));

  useEffect(() => {
    document.querySelector(".reschedule").classList.add("active");
    return () => {
      document.querySelector(".reschedule").classList.remove("active");
    };
  }, []);

  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  function hoursUntil(date) {
    const parts = date.split("/");
    const targetDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return hoursDiff;
  }

  const updateRequest = async () => {
    if (wasMuted) {
      alert(
        "Request cannot be processed as the reservation has been modified once. Contact the admin for further details."
      );
      return;
    }
    if (hoursUntil(reservationDate) < 12) {
      alert(
        "Update request cannot be processed 12 hours before reservation. Contact the admin."
      );
      return;
    }
    console.log("New date in updateRequest: ", newDate);
    await updateOrder();
    window.location.reload();
  };

  const updateOrder = async () => {
    const updateURL = `http://localhost:3500/api/v1/user/reserve/${rID}`;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const updateBody = { newDate };
    try {
      const response = await axios.post(updateURL, updateBody);
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

  return (
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
              <th className="danger">Enter new date</th>
              <td>
                <input
                  type="date"
                  class="testInput dateInputCart"
                  defaultValue={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={newDate}
                />
              </td>
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
          <button id="cancelReservation" onClick={updateRequest}>
            Update Order
          </button>
        </div>
      </div>
      <div id="outerNavigateCancel" onClick={navigateBack}>
        <button id="navigateToSupport">{"<"}Go back</button>
      </div>
    </>
  );
};

export default OrderUpdate;
