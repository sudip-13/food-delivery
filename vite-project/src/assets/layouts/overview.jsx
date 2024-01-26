import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/overview.css";
import Cookies from "js-cookie";

function Overview() {
  const [orderDetails, setOrderDetails] = useState('');
  const [total, setTotal] = useState(0);

  const fetchCartAndShow = async (e) => {
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
          .post("http://localhost:3001/user/getcart", { email })
          .then((result) => {
            console.log(result.data);
            const items = result.data;
            setOrderDetails(items);
            calculateTotal(items);
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
    } catch (error) {
      console.error("Internal server error !", error);
    }
  };

  const calculateTotal = (orderDetails) => {
    let totalPrice = 0;
    Object.keys(orderDetails).forEach((item) => {
      const pricePerItem = 10;
      totalPrice += orderDetails[item] * pricePerItem;
    });
    setTotal(totalPrice);
  };
  useEffect(() => {
    fetchCartAndShow();
  }, []);

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>

      <div className="order-items">
        {Object.keys(orderDetails).map((item) => (
          <div key={item} className="order-item">
            <span>{item}</span>
            <span>Quantity: {orderDetails[item]}</span>
            <span>Price: ${orderDetails[item] * 10}</span>
          </div>
        ))}
      </div>
      <div className="total">
        <h3>Total: ${total}</h3>
      </div>
      <div className="overview_btn">
        <button>make payment</button>
      </div>
    </div>
  );
}

export default Overview;
