import "../styles/home.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

function Home() {
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
    <div className="home">
    <div className="bg_image_home">
      <div className="menu_home">
        <div className="leftmenu_home">
          <h4> FOOD </h4>
        </div>

        <div className="rightmenu_home">
          <ul>
            <li onClick={() => navigate("/user/profile")}>Profile</li>
            <li onClick={() => navigate("/user/cart")}>Cart</li>
            <li onClick={() => navigate("/user/about")}>About Us</li>
            <li onClick={() => navigate("/user/contact")}>Contact</li>
          </ul>
        </div>
      </div>
      <div className="text_home">
        <h4>DELISIOUS - TASTEY - HIEGIENIC</h4>
        <h1> CREATIVE & EXPERIENCED </h1>
        <h3> WE ARE SERVING THE BEST FOOD WITHIN 20 MINUTES </h3>
        <button className="btn_home" onClick={() => navigate("/user/veg")}>
          {" "}
          VEG
        </button>
        <button className="btn_home" onClick={() => navigate("/user/nonveg")}>
          {" "}
          NON VEG
        </button>
      </div>
    </div>
    </div>
  );
}

export default Home;
