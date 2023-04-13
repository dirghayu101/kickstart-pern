import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

const Users = () => {
  
  const [allUsers, setAllUsers] = useState([]);

  async function fetchUserData() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const url = `http://localhost:3500/api/v1/admin/info/user/all`;
    const response = await axios.get(url);
    if (response.data.success) {
        console.log(response.data.result)
      setAllUsers(response.data.result);
    }
  }

  useEffect(() => {
    document.querySelector(".users").classList.add("active");
    fetchUserData()
    return () => {
      document.querySelector(".users").classList.remove("active");
    };
  }, []);

  async function updateUser(row){
    const userID = row.id
    const cells = row.querySelectorAll("td");
    const fName = cells[0].innerHTML.trim();
    const lName = cells[1].innerHTML.trim();
    const phoneNumber = cells[2].innerHTML.trim();
    const mailID = cells[3].innerHTML.trim();
    const url = `http://localhost:3500/api/v1/admin/modify/row/user?id=${userID}`
  }

  function removeEditable(){
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
        const getCells = button.parentElement.parentElement.querySelectorAll("td");
        for (var i = 0; i <= 3; i++) {
            getCells[i].contentEditable = "false";
        }
    })
}

  useEffect(() => {
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) =>
        button.addEventListener("click", () => {
            const getCells = button.parentElement.parentElement.querySelectorAll("td");
            for (let i = 0; i <= 3; i++) {
                getCells[i].contentEditable = "true";
            }
        })
    );

    const saveButtons = document.querySelectorAll(".save-button");
    saveButtons.forEach((button) =>
            button.addEventListener("click", function () {
                const checkEditable =
                    button.parentElement.parentElement.querySelector("td").contentEditable;
                if (checkEditable === "false" || checkEditable === "inherit") {
                    return;
                }
                const fName = button.parentElement.parentElement
                    .querySelector("td")
                    .innerHTML.trim();
                const userConfirm = window.confirm(
                    `The action will override all the values with the current first name ${fName}. Do you want to continue this action?`
                );
                if (!userConfirm) {
                    return;
                }
                const row = button.parentElement.parentElement;
                removeEditable()
                updateUser(row);
            })
        );
  }, [allUsers])

  const TableRow = (user) => {
    const {firstName, lastName, phoneNumber, mailID, userID} = user

    return(
        <tr className="user-row" id={userID}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td className="phone-number">{phoneNumber}</td>
              <td>{mailID}</td>
              <td className="danger delete-row">Delete</td>
              <td>
                <span className="edit-button material-icons-sharp">edit</span>
                <span className="save-button material-icons-sharp">save</span>
              </td>
            </tr>
    )

  }

  return (
    <main>
      <h2>All Users in the System:</h2>
      <div className="recent-reservations">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody className="first-table">
          {allUsers.map((user) => (
                <TableRow key={user.userID} {...user} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="second-table">
        <h2>Add a new user:</h2>
        <div className="recent-reservations">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <span className="add-button material-icons-sharp">
                    add_circle
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Users;
