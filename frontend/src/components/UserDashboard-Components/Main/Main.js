import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Main = () => {
  const [catalogueObjects, setCatalogueObjects] = useState([]);
  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const date = currentDate();
        const url = `http://localhost:3500/api/v1/user/spaces/${date}`;
        const response = await axios.get(url);
        const result = convertArrayToObject(response.data.response);
        setCatalogueObjects(result);
        document.querySelector(".spaces").classList.add("active");
      } catch (error) {
        console.error("Error occurred", error);
      }
    }
    fetchData();
    return () => {
      document.querySelector(".spaces").classList.remove("active");
    };
  }, []);

  function convertArrayToObject(arr) {
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const key = Object.keys(arr[i])[0];
      const value = Object.values(arr[i])[0];
      if (!obj.hasOwnProperty(key)) {
        obj[key] = value;
      }
    }
    return obj;
  }

  const spaceObjects = {
    "Conference-Room": {
      img: "/assets/user-panel/catalogue/conferenceRoom.webp",
      spaceType: "Conference Room",
      spacePrice: "For ₹6000 per day",
    },
    "Private-Office": {
      img: "/assets/user-panel/catalogue/privateOffice.webp",
      spaceType: "Private Office",
      spacePrice: "For ₹1500 per day",
    },
    "Hot-Seat": {
      img: "/assets/user-panel/catalogue/hotSeat.webp",
      spaceType: "Hot Seat",
      spacePrice: "For ₹600 per day",
    },
    Cubicle: {
      img: "/assets/user-panel/catalogue/cubicle.webp",
      spaceType: "Cubicle",
      spacePrice: "For ₹300 per day",
    },
  };

  const getElement = (space) => {
    const { img, spaceType, spacePrice } = spaceObjects[space];
    return (
      <div className="space">
        <div className="image-box">
          <img src={img} className="space-image" />
        </div>
        <div className="space-info">
          <h2>{spaceType}</h2>
          <p>{spacePrice}.</p>
          <button className="book-btn addBtn removeBtn">Add to cart</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <h1 id="bookHeading">Book Your Space</h1>
      <div class="outer-box" id="myCatalogue">
        {Object.entries(catalogueObjects).map(([space, quantity]) =>
          getElement(space)
        )}
      </div>
    </>
  );
};

export default Main;
