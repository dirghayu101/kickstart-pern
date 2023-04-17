import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderUpdate from "./OrderUpdate";
import "./ReSchedule.css";

const ReSchedule = () => {
  const [activeReservations, setActiveReservations] = useState([]);
  const [showSpecificReservation, setShowSpecificReservation] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({});
  async function fetchReservations() {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `http://localhost:3500/api/v1/user/reserve/history/current`;
      const response = await axios.get(url);
      if (response.data.activeReservationHistory.length) {
        document.querySelector("table").style.display = "initial";
        setActiveReservations(response.data.activeReservationHistory);
      }
    } catch (error) {
      console.log("error occurred", error);
    }
  }

  useEffect(() => {
    document.querySelector(".reschedule").classList.add("active");
    fetchReservations();
    return () => {
      document.querySelector(".reschedule").classList.remove("active");
    };
  }, []);

  function getSpaceType(seatID) {
    if (seatID >= 10000 && seatID < 20000) {
      return "Conference-Room";
    } else if (seatID >= 20000 && seatID < 30000) {
      return "Cubicle";
    } else if (seatID >= 30000 && seatID < 40000) {
      return "Hot-Seat";
    } else {
      return "Private-Office";
    }
  }

  function getSpacePrice(seatID) {
    if (seatID >= 10000 && seatID < 20000) {
      return 6000;
    } else if (seatID >= 20000 && seatID < 30000) {
      return 300;
    } else if (seatID >= 30000 && seatID < 40000) {
      return 600;
    } else {
      return 1500;
    }
  }

  const getTimeAndDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  function hoursUntil(date) {
    const parts = date.split("/");
    const targetDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    return hoursDiff;
  }

  const handleClick = (event) => {
    const {
      seatID,
      bookingTime,
      reservationDate,
      reservationID,
      wasMuted,
      userID,
    } = activeReservations.find(
      (reservation) => reservation.reservationID === event.target.id
    );
    const reservationInfoObj = {
      space: getSpaceType(seatID),
      spacePrice: getSpacePrice(seatID),
      bookingTime: getTimeAndDate(bookingTime),
      reservationDate: getDate(reservationDate),
      reservationID,
      seatID,
      wasMuted,
      userID,
    };
    if (wasMuted) {
      alert("Reservation can be modified only once.");
      return;
    }
    if (hoursUntil(getDate(reservationDate)) < 12) {
      alert(
        "Reservation cannot bem modified less than 12 hours before the date."
      );
      return;
    }
    setReservationInfo(reservationInfoObj);
    setShowSpecificReservation(true);
  };

  const TableRow = ({
    seatID,
    reservationID,
    bookingTime,
    reservationDate,
  }) => {
    return (
      <>
        <tr>
          <td>{getSpaceType(seatID)}</td>
          <td>{getSpacePrice(seatID)}</td>
          <td>{getDate(reservationDate)}</td>
          <td>{getTimeAndDate(bookingTime)}</td>
          <td
            id={reservationID}
            onClick={handleClick}
            class="reschedule-modify"
          >
            Modify
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      {showSpecificReservation ? (
        <>
          <OrderUpdate {...reservationInfo} />
        </>
      ) : (
        <>
          <h2>Placed Orders</h2>
          <table>
            <thead>
              <td>Space Type</td>
              <td>Amount Paid</td>
              <td>Reservation Date</td>
              <td>Booking Time</td>
              <td></td>
            </thead>
            <tbody>
              {activeReservations.map((reservation) => (
                <TableRow key={reservation.reservationID} {...reservation} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ReSchedule;
