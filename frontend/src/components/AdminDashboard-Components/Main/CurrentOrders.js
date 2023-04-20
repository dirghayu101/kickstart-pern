import React from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useState, useEffect, useRef } from "react";
import "./CurrentOrder.css";

const CurrentOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [tableEditable, setTableEditable] = useState(false);

  async function fetchAllOrders() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const deleteUrl = `http://localhost:3500/api/v1/admin/info/current/reservation`;
    try {
      const response = await axios.get(deleteUrl);
      if (response.data.success) {
        setAllOrders(response.data.response);
      }
      return;
    } catch (error) {
      alert(error.response.data.message);
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

  function makeTableEditable(event) {
    setTableEditable(!tableEditable);
  }

  async function saveEditsMods(event) {
    if (!tableEditable) {
      return;
    }
    const reserveID = event.target.parentNode.parentNode.id;
    const reserveRow = event.target.parentNode.parentNode;
    const newDate = reserveRow.querySelector("input").value;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const patchUrl = `http://localhost:3500/api/v1/admin/modify/current-reservation/update/${reserveID}`;
    try {
      const response = await axios.patch(patchUrl, { newDate });
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      alert("An error occurred in the database...");
    } finally {
      setTableEditable(!tableEditable);
    }
  }

  async function cancelReservation(event) {
    const reserveID = event.target.parentNode.id;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const deleteURL = `http://localhost:3500/api/v1/admin/modify/current-reservation/cancel/${reserveID}`;
    const result = await axios.delete(deleteURL);
    if (result.data.success) {
      window.location.reload();
    } else {
      alert("An error occurred in the database");
    }
  }

  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const TableRow = (reserveObj) => {
    const {
      bookingTime,
      reservationDate,
      reservationID,
      seatID,
      userID,
      wasMuted,
    } = reserveObj;
    const user = getUser(userID);
    if (!user) {
      return <></>;
    }
    return (
      <tr id={reservationID} class="currentOrderCompRow">
        <td>{user.firstName + " " + user.lastName}</td>
        <td>{user.phoneNumber}</td>
        <td>{seatID}</td>
        <td>{getSpaceType(seatID)}</td>
        <td>{wasMuted ? "Yes" : "No"}</td>
        <td>{getTimeAndDate(bookingTime)}</td>
        <td>
          {!tableEditable ? (
            <input
              type="date"
              defaultValue={convertDateFormat(getDate(reservationDate))}
              disabled="all"
            />
          ) : (
            <input
              type="date"
              defaultValue={convertDateFormat(getDate(reservationDate))}
            />
          )}
        </td>
        <td className="danger delete-row" onClick={cancelReservation}>
          Cancel
        </td>
        <td>
          <span
            className="save-button material-icons-sharp"
            onClick={saveEditsMods}
          >
            save
          </span>
        </td>
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
              <th>
                <span
                  className="edit-button material-icons-sharp"
                  onClick={makeTableEditable}
                >
                  edit
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <TableRow key={order.reservationID} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentOrders;
