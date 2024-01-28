import "../styles/cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

const Cart = () => {
  let [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  let sessionString = sessionStorage.getItem("Cart_item");
  cartItems = JSON.parse(sessionString);

  async function validation() {
    const cookies = await getCookieValueByName("cookie-1");
    try {
      await axios
        .get("http://localhost:3001/user/verifyjwt", {
          headers: {
            "cookie-1": cookies,
          },
        })
        .then((details) => {
          if (details.status === 403 || details.status === 401) {
            console.log("Token missing or invalid");
            navigate("/");
          }
        });
    } catch (error) {
      console.error(
        "You dont have permission to access this routes ! please logged in first "
      );
    }
  }

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    sessionStorage.setItem("Cart_item", JSON.stringify(newCartItems));
  };

  useEffect(() => {
    validation();
  });

  return (
    <div className="cart">
      <h2>Food Cart</h2>
      {cartItems === null ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - Rs {item.price}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cartbtn">
        <button onClick={() => navigate("/user/overview")}>Next</button>
      </div>
    </div>
  );
};

export default Cart;
