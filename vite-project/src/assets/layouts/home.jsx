import React from 'react';
import '../styles/home.css'

const Home = () => {
  return (
    <div className="bgimage">
      <div className="menu">
        <div className="leftmenu">
          <h4> FOOD </h4>
        </div>

        <div className="rightmenu">
          <ul>
            <li id="firstlist">Home</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="text">
        <h4>DESIGN * DEVELOPMENT * BRANDING</h4>
        <h1> CREATIVE & EXPERIENCED </h1>
        <h3> WE ARE THE ONE OF THE WORLD'S TOP CREATIVE DESIGN AGENCIES </h3>
        <button className="btn"> VEG</button>
        <button className="btn"> NON VEG</button>
      </div>
    </div>
  );
};

export default Home;