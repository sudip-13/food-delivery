import React, { useState } from "react";
import axios from "axios";
import "../styles/overview.css";
import Cookies from "js-cookie";

function Overview() {
  const fetchCartAndShow = async (e) => {
    e.preventDefault();
    let email = null;
    const token = Cookies.get("userlogincookie");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
      try {
        await axios
          .post("http://localhost:3001/user/getcart", { email})
          .then((result) => {
            console.log(result.data);
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
    } catch (error) {
      console.error("Internal server error !", error);
    }
  };

  return (
    <div className="overview">
      <div className="App">
        <header className="App-header">
          <h1>Food Delivery App</h1>
        </header>
        <div className="order-container">
          <h2>Order Overview</h2>
          {/* <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul> */}
          <div className="subtotal">
            {/* <h3>Subtotal: ${calculateSubtotal()}</h3> */}
            <button onClick={fetchCartAndShow}>Make Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
