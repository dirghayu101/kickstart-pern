import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Main = () => {
  const [currentReservations, setCurrentReservations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [totalSale, setTotalSale] = useState("");

  async function fetchReservationData() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `http://localhost:3500/api/v1/admin/info/current/reservation`;
    const response = await axios.get(url);
    if (response.data.success) {
      setCurrentReservations(response.data.response);
    }
  }

  async function fetchUserData() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `http://localhost:3500/api/v1/admin/info/user/all`;
    const response = await axios.get(url);
    if (response.data.success) {
      setAllUsers(response.data.result);
    }
  }

  useEffect(() => {
    document.querySelector(".dashboard").classList.add("active");
    fetchUserData();
    fetchReservationData();
    return () => {
      document.querySelector(".dashboard").classList.remove("active");
    };
  }, []);

  useEffect(() => {
    function calculateTotalSale() {
      let totalSale = 0;
      currentReservations.forEach((reservation) => {
        totalSale += getSpacePrice(reservation.seatID);
      });
      setTotalSale(totalSale);
    }
    if (currentReservations.length > 0 && allUsers.length > 0) {
      calculateTotalSale();
    }
  }, [currentReservations, allUsers]);

  function getUser(userID) {
    const user = allUsers.find((user) => user.userID === userID);
    return user;
  }

  function getTimeAndDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  function getDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  function getSpaceType(seatID) {
    if (seatID >= 10000 && seatID < 20000) {
      return "Conference Room";
    } else if (seatID >= 20000 && seatID < 30000) {
      return "Cubicle";
    } else if (seatID >= 30000 && seatID < 40000) {
      return "Hot Seat";
    } else {
      return "Private Office";
    }
  }

  function getSpacePrice(seatID) {
    if (seatID >= 10000 && seatID < 20000) {
      return 300;
    } else if (seatID >= 20000 && seatID < 30000) {
      return 600;
    } else if (seatID >= 30000 && seatID < 40000) {
      return 1500;
    } else {
      return 6000;
    }
  }

  const TableRow = (reserveObj) => {
    const { bookingTime, reservationDate, seatID, userID } = reserveObj;
    const user = getUser(userID);
    return (
      <tr>
        <td>{getSpaceType(seatID)}</td>
        <td>{user.phoneNumber || "Null"}</td>
        <td>{`${user.firstName} ${user.lastName}`}</td>
        <td>{getTimeAndDate(bookingTime)}</td>
        <td>₹{getSpacePrice(seatID)}</td>
        <td>{seatID}</td>
        <td>{getDate(reservationDate)}</td>
      </tr>
    );
  };

  return (
    <>
      <main>
        <h1>Dashboard</h1>

        <div class="insights">
          <div class="sales">
            <span class="material-icons-sharp">analytics</span>
            <div class="middle">
              <div class="left">
                <h3>Recent Sales</h3>
                <h1>₹{totalSale}</h1>
              </div>
            </div>
            <small class="text-muted">Active Reservations</small>
          </div>
        </div>

        <div class="recent-reservations">
          <h2>Current Reservations</h2>
          <table>
            <thead>
              <tr>
                <th>Reservation Type</th>
                <th>Contact Number</th>
                <th>Holder Name</th>
                <th>Booking Time</th>
                <th>Payment</th>
                <th>Seat ID</th>
                <th>Reservation Date</th>
              </tr>
            </thead>
            <tbody>
              {currentReservations.map((reservation) => (
                <TableRow key={uuid()} {...reservation} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Main;
