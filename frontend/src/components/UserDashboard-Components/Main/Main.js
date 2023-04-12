import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [catalogueObjects, setCatalogueObjects] = useState([]);
  const navigate = useNavigate();
  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  function setCartButton() {
    const cartButton = document.querySelector(".cart-btn button");
    cartButton.textContent = "Go to cart";
    cartButton.classList.add("go-to-cart");
    cartButton.addEventListener("click", (event) => {
      event.preventDefault();
      navigate("/user/dashboard/cart");
    });
  }

  function removeCartButton() {
    const cartButton = document.querySelector(".cart-btn button");
    cartButton.textContent = "";
    cartButton.classList.remove("go-to-cart");
  }

  useEffect(() => {
    document.querySelector(".spaces").classList.add("active");
    setCartButton();
    fetchData();
    async function fetchData() {
      try {
        const date = currentDate();
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const url = `http://localhost:3500/api/v1/user/spaces/${date}`;
        const response = await axios.get(url);
        const result = convertArrayToObject(response.data.response);
        setCatalogueObjects(result);
      } catch (error) {
        console.error("Error occurred", error);
      }
    }
    return () => {
      document.querySelector(".spaces").classList.remove("active");
      removeCartButton();
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
    "Conference_Room": {
      img: "/images/dashboard-assets/conferenceRoom.webp",
      spaceType: "Conference Room",
      spacePrice: "For ₹6000 per day",
    },
    "Private_Office": {
      img: "/images/dashboard-assets/privateOffice.webp",
      spaceType: "Private Office",
      spacePrice: "For ₹1500 per day",
    },
    "Hot_Seat": {
      img: "/images/dashboard-assets/hotSeat.webp",
      spaceType: "Hot Seat",
      spacePrice: "For ₹600 per day",
    },
    "Cubicle": {
      img: "/images/dashboard-assets/cubicle.webp",
      spaceType: "Cubicle",
      spacePrice: "For ₹300 per day",
    },
  };

  const addHoverEffect = (event) => {
    const button = event.target;
    const notClicked =
      button.classList.contains("book-btn") &&
      button.classList.contains("addBtn") &&
      button.classList.contains("removeBtn");
    if (!notClicked) {
      button.textContent = "Remove";
    }
  };

  const removeHoverEffect = (event) => {
    const button = event.target;
    const notClicked =
      button.classList.contains("book-btn") &&
      button.classList.contains("addBtn") &&
      button.classList.contains("removeBtn");
    if (!notClicked) {
      button.textContent = "Added";
    }
  };

  const handleClick = (event) => {
    let cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const button = event.target;
    const itemID = button.parentElement.querySelector("h2").textContent.trim().replace(/\s+/g, '_');
    const notClicked =
      button.classList.contains("book-btn") &&
      button.classList.contains("addBtn") &&
      button.classList.contains("removeBtn");
    const getItem = cartData.find((item) => item.itemID === itemID);
    if (notClicked) {
      if (!getItem) {
        cartData.push({
          itemID,
          value: 1,
          reserveDate: new Date().toISOString().slice(0, 10)
        });
      } else {
        getItem.value = 1;
        getItem.reserveDate = new Date().toISOString().slice(0, 10)
      }
      button.classList.remove("addBtn", "book-btn", "removeBtn");
      button.classList.add("remove-book-btn");
      button.textContent = "Added";
    } else {
      if (getItem) {
        cartData = cartData.filter((obj) => obj.itemID !== itemID);
      }
      button.classList.remove("remove-book-btn");
      button.classList.add("addBtn", "book-btn", "removeBtn");
      button.textContent = "Add to cart";
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));
  };

  const getElement = (space) => {
    space = space.replace("-", "_")
    const { img, spaceType, spacePrice } = spaceObjects[space];
    return (
      <div className="space">
        <div className="image-box">
          <img src={img} alt="space" className="space-image" />
        </div>
        <div className="space-info">
          <h2>{spaceType}</h2>
          <p>{spacePrice}.</p>
          <button
            className="book-btn addBtn removeBtn"
            onMouseEnter={addHoverEffect}
            onMouseLeave={removeHoverEffect}
            onClick={handleClick}
          >
            Add to cart
          </button>
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
