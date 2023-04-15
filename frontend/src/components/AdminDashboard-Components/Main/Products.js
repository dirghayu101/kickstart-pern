import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "./Products.css";

const Products = () => {

  const [spaceCapacity, setSpaceCapacity] = useState({});
  const [spaceOnDate, setSpaceOnDate] = useState({});
  const [spaceDate, setSpaceDate] = useState(new Date().toISOString().slice(0,10));
  const spaces = ["Conference-Room", "Cubicle", "Hot-Seat", "Private-Office"];

  const fetchSpaceCapacityData = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const urlGet = `http://localhost:3500/api/v1/admin/info/reservation/spaceCapacity`;
    const response = await axios.get(urlGet);
    const totalSpaceObj = response.data.spaceObj;
    setSpaceCapacity(totalSpaceObj);
  }

  const fetchSpaceOnDate = async () =>{
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const urlGet = `http://localhost:3500/api/v1/admin/info/reservation/spaceAvailable/${spaceDate}`;
    const response = await axios.get(urlGet);
    const spaceForDateObj = convertArrayToObject(response.data.response);
    setSpaceOnDate(spaceForDateObj);
  }

  useEffect(() => {
    document.querySelector(".products").classList.add("active");
    fetchSpaceCapacityData();
    fetchSpaceOnDate();
    return () => {
      document.querySelector(".products").classList.remove("active");
    };
  },[])


  function convertArrayToObject(array) {
    const obj = {};
    array.forEach((item) => {
      const key = Object.keys(item)[0];
      obj[key] = item[key];
    });
    return obj;
  }

  const TableRow = ({space}) => {
    const capacity = spaceCapacity[space]
    const occupied = spaceOnDate[space] || 0;
    const available = capacity - occupied;
    
    if(!capacity){
      return null
    }

    return (
      <tr className="user-row">
        <td>{spaceDate}</td>
        <td>{space}</td>
        <td>{capacity}</td>
        <td>{occupied}</td>
        <td>{available}</td>
      </tr>
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const date = document.querySelector("#dateInput").value;
    setSpaceDate(date);
    await fetchSpaceCapacityData();
    await fetchSpaceOnDate();
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="date" id="dateInput" defaultValue={spaceDate} />
        <button id="getDateBtn" type="submit">
          Get Space Data
        </button>
      </form>
      <br />
      <br />
      <br />
      <h2>Spaces Available</h2>
      <div className="recent-reservations">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Space</th>
              <th>Total Capacity</th>
              <th>Vacant Seats</th>
              <th>Seats Occupied</th>
            </tr>
          </thead>
          <tbody className="first-table">
            {spaces.map((space) => (
              <TableRow key={uuid()} space={space} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Products;
