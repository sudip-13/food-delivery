import React, { useState, useEffect } from 'react';
import '../styles/adminoverview.css';
import axios from 'axios';
import getCookieValueByName from "./cookie.js";

const AdminOverview = () => {
  const [jsonObject, setJsonObject] = useState([]);


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
 
  const fetchOrderandShow = async () => {
    try {
      const result = await axios.post("http://localhost:3001/user/getpendingorderdetails");
      if (result.status === 200) {
        setJsonObject(result.data);
      } else {
        console.log("Failed to fetch above details");
      }
    } catch (error) {
      console.log('check order carefully', error);
    }
  };
  

  useEffect(() => {
    setInterval( fetchOrderandShow, 1000);
    validation()
  }, []);

  const handleOrderDelivered = async(email,fullName) => {
    console.log(`Order delivered to ${fullName}`);
    const orderStatus="order delivered"
    try {
      await axios
        .post("http://localhost:3001/user/orderdelivery", { email ,orderStatus})
        .then((result) => {
          if(result.status===200){
            console.log(result.data)
          }
          else{
            console.log("Failed to update ")
          }
    })
  }
  catch(error){
      console.log('check order carefully',error)
  }
}

  return (
    <div>
      <h1>Order List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Item</th>
            <th>Building Number</th>
            <th>Room No</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {jsonObject.map((order, index) => (
            // Add a conditional check for orderStatus === 'Order placed'
            order.orderStatus === 'order placed' && (
              <tr key={index}>
                <td>{order.fullName}</td>
                <td>{order.mobileNumber}</td>
                <td>{order.item_name.join(', ')}</td>
                <td>{order.buildingNumber}</td>
                <td>{order.roomNumber}</td>
                <td>
                  <button onClick={() => handleOrderDelivered(order.email,order.fullName)}>Order Delivered</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOverview;
