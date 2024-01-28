import React, { useState, useEffect } from 'react';
import '../styles/adminoverview.css';
import axios from 'axios';

const AdminOverview = () => {
  const [jsonObject, setJsonObject] = useState([]);
  const [orders, setOrders] = useState([]);

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
    fetchOrderandShow();
  }, []);

  const handleOrderDelivered = (name) => {
    // Implement logic to mark the order as delivered
    console.log(`Order delivered for ${name}`);
  };

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
            <tr key={index}>
              <td>{order.fullName}</td>
              <td>{order.mobileNumber}</td>
              <td>{order.item_name.join(', ')}</td>
              <td>{order.buildingNumber}</td>
              <td>{order.roomNumber}</td>
              <td>
                <button onClick={() => handleOrderDelivered(order.fullName)}>Order Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOverview;
