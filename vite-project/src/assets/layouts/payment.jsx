import "../styles/payment.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";


const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  async function validation() {
    const cookies = await getCookieValueByName("cookie-1");
    try {
      await axios.get("http://localhost:3001/user/verifyjwt", {
          headers: {
            "cookie-1": cookies
          },})
        .then((result) => {
          if (result.data == 'welcome') {
            console.log('Welcome');
          } else {
            console.log("Unauthorized or Invalid token");
            navigate("/");
          }
        });
    } catch (error) {
      console.error(
        "You dont have permission to access this routes ! please logged in first"
      );
      navigate("/");
    }
  }

  useEffect(() => {
    validation(); 
  });


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePayment = () => {
    console.log(`Processing payment using: ${selectedOption}`);
  };

  return (
    <div className="payment-container">
      <h1>Payment Options</h1>
      <div className="payment-option">
        <input
          type="radio"
          name="paymentOption"
          value="paytm"
          id="paytm"
          onChange={() => handleOptionSelect('Paytm')}
        />
        <label htmlFor="paytm">Paytm</label>
      </div>
      <div className="payment-option">
        <input
          type="radio"
          name="paymentOption"
          value="phonepe"
          id="phonepe"
          onChange={() => handleOptionSelect('PhonePe')}
        />
        <label htmlFor="phonepe">PhonePe</label>
      </div>
      <div className="payment-option">
        <input
          type="radio"
          name="paymentOption"
          value="googlepay"
          id="googlepay"
          onChange={() => handleOptionSelect('Google Pay')}
        />
        <label htmlFor="googlepay">Google Pay</label>
      </div>
      <div className="payment-option">
        <input
          type="radio"
          name="paymentOption"
          value="upi"
          id="upi"
          onChange={() => handleOptionSelect('UPI')}
        />
        <label htmlFor="upi">UPI</label>
      </div>
      <div className="payment-option">
        <input
          type="radio"
          name="paymentOption"
          value="cod"
          id="cod"
          onChange={() => handleOptionSelect('Cash on Delivery')}
        />
        <label htmlFor="cod">Cash on Delivery</label>
      </div>
      <button className="payment-button" onClick={handlePayment} disabled={!selectedOption}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
