import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


const Order = () => {
  const [activeReservations, setActiveReservations] = useState([]);

  useEffect(() => {
    document.querySelector('.orders').classList.add('active')
    async function fetchReservations() {
      try {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const url = `http://localhost:3500/api/v1/user/reserve/history/current`;
        const response = await axios.get(url);
        setActiveReservations(response.data.activeReservationHistory);
      } catch (error) {
        console.log("error occurred", error);
      }
    }
    fetchReservations();
    return () => {
      document.querySelector('.orders').classList.remove('active');
  };
  }, []);

  const TableRow = ({
    seatID,
    reservationID,
    transactionNumber,
    bookingTime,
    reservationDate,
  }) => {
    return (
      <tr className="">
        <td>{seatID}</td>
        <td>{reservationID}</td>
        <td>{transactionNumber}</td>
        <td>{bookingTime}</td>
        <td>{reservationDate}</td>
      </tr>
    );
  };

  return (
    <>
      <table>
        <tbody>
          {activeReservations.map((reservation) => (
            <TableRow key={reservation.reservationID} {...reservation} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Order;
