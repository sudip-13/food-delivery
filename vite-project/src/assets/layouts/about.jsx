import '../styles/about.css'
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

const About = () => {

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
    <section className="about-us">
      <div className="about">
        <div className="text-about">
          <h2>About Us</h2>
          <h5>Front-end Developer &amp; Designer</h5>
          <p>Food Delivery Service: A restaurant, prepared food shop, or fast food establishment, in which the principal use is production of prepared food for delivery to customers located off the business premises.Delivery Services are billable services that are directly associated with a product in a sales order or a return order, for example, the delivery of a high-definition television. Stand-alone delivery service lines can also be created, and if required, associated with a product at a later time.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
