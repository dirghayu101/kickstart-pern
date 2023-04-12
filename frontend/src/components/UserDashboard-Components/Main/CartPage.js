import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function CartPage() {
  const navigate = useNavigate()
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0)
  const formattedDate = new Date().toISOString().slice(0, 10);
  const spaceDataObjects = {
    "Conference_Room": {
      img: "/images/dashboard-assets/conferenceRoom.webp",
      objName: "Conference_Room",
      price: 6000,
    },
    "Private_Office": {
      img: "/images/dashboard-assets/privateOffice.webp",
      objName: "Private_Office",
      price: 1500,
    },
    "Hot_Seat": {
      img: "/images/dashboard-assets/hotSeat.webp",
      objName: "Hot_Seat",
      price: 600,
    },
    "Cubicle": {
      img: "/images/dashboard-assets/cubicle.webp",
      objName: "Cubicle",
      price: 300,
    },
  };

  const calculateTotal = () => {
    const cartData = JSON.parse(localStorage.getItem("cartData"))
    let total = 0
    cartData.forEach((space)=>{
        const {price} = spaceDataObjects[space.itemID]
        total += price * Number(space.value)
    })
    setTotalPrice(total)
  }

  const addItem = (itemId) => {
    const item = cartData.find((item) => item.itemID === itemId);
    const reserveDate = document.querySelector(`#${item.itemID}`).value
    if (item) {
      const updatedItem = { ...item, value: item.value + 1,  reserveDate};
      const updatedCart = cartData.map((item) => (item.itemID === itemId ? updatedItem : item));
      setCartData(updatedCart);
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      calculateTotal()
    }
  };

  const removeItem = (itemId) => {
    const updatedCart = cartData.map((item) => {
      if (item.itemID === itemId) {
        const reserveDate = document.querySelector(`#${item.itemID}`).value
        item.reserveDate = reserveDate
        if (item.value > 1) {
          return { ...item, value: item.value - 1, reserveDate };
        } else {
          return null;
        }
      } else {
        return item;
      }
    }).filter(Boolean);
    setCartData(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart));
    calculateTotal()
  };

  function convertArrayToObject(arr) {
    const result = {};
    arr.forEach(item => {
      const key = item.itemID.replace('_', '-');
      if (!result[key]) {
        result[key] = [item.reserveDate];
      } else {
        result[key].push(item.reserveDate);
      }
      for (let i = 1; i < item.value; i++) {
        result[key].push(item.reserveDate);
      }
    });
    return result;
  }

  async function insertInDatabase(){
    const cartItems = JSON.parse(localStorage.getItem("cartData"))
    const reservation = convertArrayToObject(cartItems)
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const urlPost = "http://localhost:3500/api/v1/user/reserve"
    const response = await axios.post(urlPost, {reservation})
    if(response.data.success){
      localStorage.removeItem("cartData")
      return true
    } else{
      alert("Something went wrong, please try again later!")
      return false
    }
  }

  function setupPageElements() {
    document.querySelector(".spaces").classList.add("active");
    const cartButton = document.querySelector(".cart-btn button");
    cartButton.innerHTML = "checkout";
    cartButton.classList.add("checkout");
    cartButton.addEventListener('click', async (event) => {
      event.preventDefault();
      if(await insertInDatabase()){
        navigate("/user/pay");
      }else{
        return
      }
    })
  }

  function removePageElements() {
    document.querySelector(".spaces").classList.remove("active");
    const cartButton = document.querySelector(".cart-btn button");
    cartButton.innerHTML = "";
    cartButton.classList.remove("checkout");
  }

  useEffect(() => {
    setupPageElements();
    calculateTotal()
    return () => {
      removePageElements();
    };
  }, []);
  return (
    <>
      <div class="outer-box">
        <h2>Shopping Cart</h2>
        <div class="outer-layer">
          <div class="cart-body">
            <div class="heading-row">
              <div class="heading-row-type">
                <p>Type</p>
              </div>
              <div class="heading-row-space">
                <p>Space</p>
              </div>
              <div class="heading-row-date">
                <p>Date</p>
              </div>
              <div class="heading-row-price">
                <p>Price</p>
              </div>
            </div>
            <div id="insertRows">
              {cartData.map((item) => {
                const { img, objName, price } = spaceDataObjects[item.itemID];
                const formattedPrice = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(price * item.value);
                  
                return (
                  <div className="item-row" name=""key={item.itemID}>
                    <div className="item-picture">
                      <img src={img} alt={`${objName}`} />
                    </div>
                    <div className="space-type">
                      <p>{objName.replace("_", " ")}</p>
                    </div>
                    <div className="number-item">
                      <button
                        className="material-symbols-rounded decrement"
                        onClick={() => removeItem(item.itemID)}
                      >
                        remove
                      </button>
                      <span className="quantity item-value">{item.value}</span>
                      <button
                        className="material-symbols-rounded increment"
                        onClick={() => addItem(item.itemID)}
                      >
                        add
                      </button>
                    </div>
                    <div className="date">
                    <input type="date" class="testInput" id={`${item.itemID}`} defaultValue={formattedDate}/>
                    </div>
                    <div className="price">
                      <p>{formattedPrice}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="total-price">
        <p className="title-total">TOTAL:</p>
        <p className="total-value">₹{totalPrice}</p>
      </div>
    </>
  );
}
export default CartPage;


/*
[ 
  {
      "itemID": "Private_Office",
      "value": 3,
      "reserveDate": "2023-04-22"
  },
  {
      "itemID": "Hot_Seat",
      "value": 7,
      "reserveDate": "2023-04-28"
  },
  {
      "itemID": "Cubicle",
      "value": 2,
      "reserveDate": "2023-04-12"
  },
  {
      "itemID": "Conference_Room",
      "value": 1,
      "reserveDate": "2023-04-17"
  },
]

{
  "Private-Office": ["2023-04-22", "2023-04-22", "2023-04-22"],
  "Hot-Seat": ["2023-04-28", "2023-04-28", "2023-04-28", "2023-04-28", "2023-04-28", "2023-04-28", "2023-04-28"],
  "Cubicle":["2023-04-12", "2023-04-12"],
  "Conference-Room":["2023-04-17"]
}

*/

