import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [allReservations, setAllReservations] = useState([]);
  const [optionSelected, setOptionSelected] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [feedback, setFeedback] = useState("");

  const fetchAllReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const url = `http://localhost:3500/api/v1/user/reserve/history/all`;
      const response = await axios.get(url);
      if (response.data.allReservationHistory.length) {
        setAllReservations(response.data.allReservationHistory);
        setShowTable(true);
      }
    } catch (error) {
      console.log("error occurred", error);
    }
  };

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

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    document.querySelector(".feedback").classList.add("active");
    fetchAllReservations();
    return () => {
      document.querySelector(".feedback").classList.remove("active");
    };
  }, []);

  const OptionsInSelect = (reservation) => {
    const { seatID, reservationID, reservationDate } = reservation;
    const optionValue = `${getSpaceType(seatID)} on ${getDate(
      reservationDate
    )}`;
    return (
      <option key={reservationID} id={reservationID}>
        {optionValue}
      </option>
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const reservationSelect = event.target.elements["reservation-select"];
    const selectedOption =
      reservationSelect.options[reservationSelect.selectedIndex];
    const seatDetails = allReservations.find(
      (reservation) => reservation.reservationID === selectedOption.id
    );
    const postObj = {
      seatNum: seatDetails.seatID,
      comment: feedback,
      rating: 5,
    };
    const postURL = "http://localhost:3500/api/v1/user/reserve/post/feedback";
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(postURL, postObj);
    if (response.data.success) {
      setFeedback("");
      alert("Your feedback has been successfully sent to the admin!");
    }
  }

  return (
    <>
      <form id="feedbackForm" onSubmit={handleSubmit}>
      <h2>Feedback Form</h2>
        <div className="reservation-option">
          <label htmlFor="reservation-select" id="reservationOptionLabel">Select a reservation:</label>
          <select
            required
            id="reservation-select"
            value={optionSelected}
            onChange={(e) => setOptionSelected(e.target.value)}
          >
            <option value="" disabled hidden>
              --Reservation--
            </option>
            {allReservations
              .slice(-5)
              .reverse()
              .map((reservation) => (
                <OptionsInSelect {...reservation} />
              ))}
          </select>
        </div>
        <textarea
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback"
          rows={10}
          cols={100}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Feedback;
