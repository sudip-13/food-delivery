import React from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
