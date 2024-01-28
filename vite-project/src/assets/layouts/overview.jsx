import React, { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";
import "../styles/overview.css";
import Cookies from "js-cookie";

function Overview() {
 
  const navigate = useNavigate();
  const [jsonObject, setJsonObject] = useState('');


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

  const fetchOrderAndShow = async (e) => {
    let email = null;
    const token = Cookies.get("cookie-1");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
      try {
        await axios
          .post("http://localhost:3001/user/getorderdetails", { email })
          .then((result) => {
            setJsonObject(result.data)
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
    } catch (error) {
      console.error("Internal server error !", error);
    }
  };

  useEffect(() => {
    validation();
    fetchOrderAndShow();
  }, []);


  // console.log(jsonObject)
  const isOrderPlacedOrDelivered =
  jsonObject.orderStatus === 'order placed' || jsonObject.orderStatus === 'order delivered';


  return (
    <div>
      {isOrderPlacedOrDelivered ? (
        <>
          <h1>Order Details</h1>
          <ul>
            {jsonObject.item_name.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>Payment Status: {jsonObject.paymentStatus}</p>
          <p>Order Status: {jsonObject.orderStatus}</p>
        </>
      ) : (
        <p>Order status is not "order placed" or "order delivered".</p>
      )}
    </div>
  );
};


export default Overview;
