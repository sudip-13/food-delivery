// ConfirmOrderForm.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from'axios'
import getCookieValueByName from "./cookie.js";

const ConfirmOrderForm = () => {
  const [fullName, setFullName] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
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

  const handleConfirmOrder = async(e) => {
    e.preventDefault();
    let email = null;
    const token = await getCookieValueByName("cookie-1");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
    let orderStatus="make payment"
    try {
        await axios
        .post("http://localhost:3001/user/confirmorder",{
            email,buildingNumber,roomNumber,mobileNumber,orderStatus,fullName
        }).then((result)=>{
            if(result.status===200){
                console.log("select payment method")
            }
            else{
                console.log("Order cannot be placed at this time")
            }
        })

    } catch (error) {
        console.log("failed to place order ",error)
    }
  }
  catch(error){
    console.log("failed to fetch the mail",error)
  }
    navigate('/user/payment');
  };

  return (
    <div>
      <h2>Confirm Order</h2>
      <form>
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </label>
        <br />
        <label>
          Building Number:
          <input type="text" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Room Number:
          <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
        </label>
        <br />
        <button type="button" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default ConfirmOrderForm;
