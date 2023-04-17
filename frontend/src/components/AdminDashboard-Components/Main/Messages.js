import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
/*
1. Route to get all the unread feedbacks.
2. Route to get all feedbacks which have been read.
3. Create a unique ID for all reservations, which should also act their primary key.
4. Button to remove feedback from display and mark it as read. Should update the database. How will you identify the feedback for this functionality? Using the primary key created in the step 3.
5. Sort them from latest to last one sorta thing.
6. Functionality to drop a message to the feedback when a user deletes or update their reservation.
7. Aside component update.
*/

/*
 id={reservationID}
              onClick={handleClick} 
<span
             
              class="helpBtnSupport material-symbols-outlined"
            >
              help
            </span>
*/

const Messages = () => {
  const [showUnreadMessages, setShowUnreadMessages] = useState(true);
  const [users, setUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [readMessages, setReadMessages] = useState([]);
  const [messageDetail, setMessageDetail] = useState(false);
  const [messageDetailObj, setMessageDetailObj] = useState({});

  const readMessageGet = `http://localhost:3500/api/v1/admin/reservation/feedbacks/read`;
  const unreadMessageGet = `http://localhost:3500/api/v1/admin/reservation/feedbacks/unread`;

  async function fetchMessages(getUrl, setFunction) {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.get(getUrl);
    if (response.data.success) {
      console.log(response.data.feedback);
      setFunction(response.data.feedback);
    } else {
      console.log("An error occurred.", response);
    }
  }

  async function fetchUserData() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `http://localhost:3500/api/v1/admin/info/user/all`;
    const response = await axios.get(url);
    if (response.data.success) {
      console.log(response.data.result);
      setUsers(response.data.result);
    }
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

  function getTimeAndDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  async function markAsRead(event) {
    const id = event.target.parentNode.id;
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const postUrl = `http://localhost:3500/api/v1/admin/reservation/feedbacks/${id}`;
    const result = await axios.post(postUrl, {});
    if (result.data.success) {
      window.location.reload();
    }
  }

  function addDot(str) {
    return str.length > 50 ? "..." : "";
  }

  function showMessageDetail(msgObj) {
    setMessageDetailObj(msgObj);
    setMessageDetail(!messageDetail);
  }

  const MessageDetail = () => {
    const {
      userID,
      comment,
      feedbackID,
      feedbackRead,
      seatNum,
      time,
      username,
      phoneNumber,
    } = messageDetailObj;

    return <></>;
  };

  const TableRow = (message) => {
    const { userID, comment, feedbackID, feedbackRead, seatNum, time } =
      message;
    const { firstName, lastName, phoneNumber } = users.find(
      (user) => user.userID === userID
    );
    const username = firstName + " " + lastName;

    const messageObj = {
      userID,
      comment,
      feedbackID,
      feedbackRead,
      seatNum,
      time,
      username,
      phoneNumber,
    };

    return (
      <>
        <tr id={feedbackID}>
          <td>{username}</td>
          <td>{getSpaceType(seatNum)}</td>
          <td>{comment.slice(0, 50) + addDot(comment)}</td>
          <td>
            <span
              class="material-symbols-outlined"
              onClick={() => {
                showMessageDetail(messageObj);
              }}
            >
              info
            </span>
          </td>
          {!feedbackRead ? <td onClick={markAsRead}>Mark as Read</td> : <></>}
        </tr>
      </>
    );
  };

  useEffect(() => {
    fetchUserData();
    fetchMessages(readMessageGet, setReadMessages);
    fetchMessages(unreadMessageGet, setUnreadMessages);
    document.querySelector(".messages").classList.add("active");
    return () => {
      document.querySelector(".messages").classList.remove("active");
    };
  }, []);

  const buttonText = showUnreadMessages
    ? `Show Read Messages`
    : `Show Unread Messages`;

  const headingText = showUnreadMessages ? `Unread Messages` : `Read Messages`;

  const bodyMessages = showUnreadMessages ? unreadMessages : readMessages;

  function swapMessageType() {
    setShowUnreadMessages(!showUnreadMessages);
  }

  return messageDetail ? (
    <>{/* the element detailing the reservation info */}</>
  ) : (
    <main>
      <button onClick={swapMessageType}>{buttonText}</button>
      <h2>{headingText}</h2>
      <div className="recent-reservations">
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Space Type</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {bodyMessages.map((message) => (
              <TableRow key={message.feedbackID} {...message} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Messages;
