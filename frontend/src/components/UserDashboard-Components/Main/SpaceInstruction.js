import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Feedback.css";

const SpaceInstruction = (reservation) => {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    document.querySelector(".support").classList.add("active");
    return () => {
      document.querySelector(".support").classList.remove("active");
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const postObj = {
      seatNum: reservation.seatID,
      comment: feedback,
      rating: 5,
    };
    const postURL = "http://localhost:3500/api/v1/user/reserve/post/feedback";
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(postURL, postObj);
    if (response.data.success) {
      setFeedback("");
      alert("Your instructions have been successfully sent to the admin!");
    }
    window.location.reload();
  }

  return (
    <>
      <form id="feedbackForm" onSubmit={handleSubmit}>
        <h2>Instruction Form</h2>
        <textarea
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your instructions for the space"
          rows={10}
          cols={100}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SpaceInstruction;
