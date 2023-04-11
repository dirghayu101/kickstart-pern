import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const navigate = useNavigate()
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0)
  
  const spaceDataObjects = {
    "Conference Room": {
      img: "/images/dashboard-assets/conferenceRoom.webp",
      objName: "Conference Room",
      price: 6000,
    },
    "Private Office": {
      img: "/images/dashboard-assets/privateOffice.webp",
      objName: "Private Office",
      price: 1500,
    },
    "Hot Seat": {
      img: "/images/dashboard-assets/hotSeat.webp",
      objName: "Hot Seat",
      price: 600,
    },
    Cubicle: {
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
    if (item) {
      const updatedItem = { ...item, value: item.value + 1 };
      const updatedCart = cartData.map((item) => (item.itemID === itemId ? updatedItem : item));
      setCartData(updatedCart);
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      calculateTotal()
    }
  };

  const removeItem = (itemId) => {
    const updatedCart = cartData.map((item) => {
      if (item.itemID === itemId) {
        if (item.value > 1) {
          return { ...item, value: item.value - 1 };
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

  function setupPageElements() {
    document.querySelector(".spaces").classList.add("active");
    const cartButton = document.querySelector(".cart-btn button");
    cartButton.innerHTML = "checkout";
    cartButton.classList.add("checkout");
    cartButton.addEventListener('click', (event) => {
      event.preventDefault();
      navigate("/user/pay");
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
                  const formattedDate = new Date().toISOString().slice(0, 10);
                return (
                  <div className="item-row" key={item.itemID}>
                    <div className="item-picture">
                      <img src={img} alt={`${objName}`} />
                    </div>
                    <div className="space-type">
                      <p>{objName}</p>
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
                    <input type="date" value={formattedDate} />
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
