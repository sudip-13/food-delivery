import "../styles/payment.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";


const Payment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [jsonObject, setJsonObject] = useState('');

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




  const handlePayment =async () => {
    let email = null;
    let paymentamount=null;
    const token = await getCookieValueByName("cookie-1");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
      try {
        await axios
          .post("http://localhost:3001/user/gettotalprice", { email })
          .then((result) => {
            const jsonObject=result.data
            paymentamount=jsonObject.totalPrice
            setJsonObject(jsonObject)
          
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
  
        let paymentStatus=`${selectedOption}-${paymentamount}`
        console.log(paymentStatus)
        const orderStatus='order placed'
        try{
          await axios
          .post("http://localhost:3001/user/makepayment",{email,paymentStatus,orderStatus})
          .then((result)=>{
            if(result.status===200){
              console.log(result.data)
            }
            else{
              console.log("Failed to make  payment")
            }
          })
    
        }
        catch(error){
          console.log(error)
        }

    } catch (error) {
      console.error("Internal server error !", error);
    }
    
    navigate('/user/orderplaced')
  
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
