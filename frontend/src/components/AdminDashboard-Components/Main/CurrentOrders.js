import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";

const CurrentOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  async function fetchAllOrders() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const getUrl = `http://localhost:3500/api/v1/admin/info/current/reservation`;
    const response = await axios.get(getUrl);
    if (response.data.success) {
      setAllOrders(response.data.response);
    } else {
      console.log("An error occurred.", response);
      return;
    }
  }

  async function fetchAllUsers() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const getUrl = `http://localhost:3500/api/v1/admin/info/user/all`;
    const response = await axios.get(getUrl);
    if (response.data.success) {
      setAllUsers(response.data.result);
    } else {
      console.log("An error occurred.", response);
      return;
    }
  }

  useEffect(() => {
    document.querySelector(".orders").classList.add("active");
    fetchAllUsers();
    fetchAllOrders();
    return () => {
      document.querySelector(".orders").classList.remove("active");
    };
  });

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

  const TableRow = (reserveObj) => {
    const {
      bookingTime,
      reservationDate,
      seatID,
      userID,
      wasMuted
    } = reserveObj;
    const user = getUser(userID);
    if(!user){
        return(
            <></>
        )
    }
    return (
      <tr>
        <td>{user.firstName+" "+user.lastName}</td>
        <td>{user.phoneNumber}</td>
        <td>{seatID}</td>
        <td>{getSpaceType(seatID)}</td>
        <td>{wasMuted ? "Yes" : "No"}</td>
        <td>{getTimeAndDate(bookingTime)}</td>
        <td>{getDate(reservationDate)}</td>
      </tr>
    );
  };

  return (
    <>
      <h2>Active Orders</h2>
        <div className="recent-reservations">
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Seat ID</th>
              <th>Space Type</th>
              <th>Modified</th>
              <th>Booking Time</th>
              <th>Reservation Date</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <TableRow key={uuid()} {...order} />
              ))}
            </tbody>
          </table>
        </div>
    </>
  );
};

export default CurrentOrders;
