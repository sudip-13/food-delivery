import "../styles/profile.css";
import pic from '../images/profile.jpg'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

function Profile() {

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



  return (
    <div className="profile">
      <div class="profile-container">
        <div class="profile-picture">
        <img src={pic} alt=" " />
        </div>
        <div class="user-details">
          <h2>NEHA SHARMA</h2>
          <p><b>Email :</b> rg370900@gmail.com</p>
          <p><b>Student Code : </b>BWU/BTA/21/052</p>
          <p><b>Sec : </b>A</p>
          <p><b>Depertment :</b> Computer Science and Engeneering</p>
          <p><b>Location :</b> Bankura</p>
        </div>
        <div class="edit-profile">
          <button>Log out</button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
