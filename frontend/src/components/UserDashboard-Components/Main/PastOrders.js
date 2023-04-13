import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


const PastOrders = () => {
  const [activeReservations, setActiveReservations] = useState([]);

  useEffect(() => {
    document.querySelector("table").style.display = "none"
    document.querySelector('.orders').classList.add('active')
    async function fetchReservations() {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const url = `http://localhost:3500/api/v1/user/reserve/history/all`;
        const response = await axios.get(url);
        console.log(response)
        if(response.data.allReservationHistory.length){
          document.querySelector("table").style.display = "initial"
          setActiveReservations(response.data.allReservationHistory);
        }
      } catch (error) {
        console.log("error occurred", error);
      }
    }
    fetchReservations();
    return () => {
      document.querySelector("table").style.display = "initial"
      document.querySelector('.orders').classList.remove('active');
  };
  }, []);

  const getTimeAndDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }
  function getSpaceType(seatID){
    if(seatID >= 10000 && seatID < 20000){
      return "Conference-Room"
    } else if(seatID >= 20000 && seatID < 30000){
      return "Cubicle"
    } else if(seatID >= 30000 && seatID < 40000){
      return "Hot-Seat"
    } else{
      return "Private-Office"
    }
  }

  const TableRow = ({
    seatID,
    reservationID,
    transactionNumber,
    bookingTime,
    reservationDate,
  }) => {
    return (
      <tr className="">
        <td>{getSpaceType(seatID)}</td>
        <td>{reservationID}</td>
        <td>{transactionNumber}</td>
        <td>{getTimeAndDate(bookingTime)}</td>
        <td>{getDate(reservationDate)}</td>
      </tr>
    );
  };

  return (
    <>
      <h2>Past Orders</h2>
      <table>
        <thead>
          <td>Space Type</td>
          <td>Reservation ID</td>
          <td>Transaction Number</td>
          <td>Booking Time</td>
          <td>Reservation Date</td>
        </thead>
        <tbody>
          {activeReservations.map((reservation) => (
            <TableRow key={reservation.reservationID} {...reservation} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PastOrders;
