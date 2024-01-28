import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";
import axios from "axios";
import "../styles/veg.css";
import rice from "../images/rice.jpg";
import panner from "../images/panner.jpg";
import rotipaner from "../images/rotipaner.jpg";
import bhaja1 from "../images/bhaja1.jpg";

const Veg = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function validation() {
    const cookies = await getCookieValueByName("cookie-1");
    try {
      await axios
        .get("http://localhost:3001/user/verifyjwt", {
          headers: {
            "cookie-1": cookies,
          },
        })
        .then((result) => {
          if (result.data == "welcome") {
            console.log("Welcome");
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

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    let cart = [...cartItems, item];
    sessionStorage.setItem("Cart_item", JSON.stringify(cart));
  };

  useEffect(() => {
    validation();
  });

  return (
    <div className="veg">
      <div className="bgimageveg">
        <div className="m_menu">
          <div className="l_menu">
            {" "}
            <h4> FOOD MENU </h4>
          </div>{" "}
          <div className="r_menu">
            <ul>
              <li id="firstlist" onClick={() => navigate("/user/home")}>
                Home
              </li>
              <li id="firstlist" onClick={() => navigate("/user/cart")}>
                Cart
              </li>
              <li id="firstlist" onClick={() => navigate("/user/profile")}>
                Profile
              </li>
              <li id="firstlist" onClick={() => navigate("/user/contact")}>
                Contact
              </li>
              <li id="firstlist" onClick={() => navigate("/user/about")}>
                About Us
              </li>
            </ul>
          </div>
        </div>
        <div className="veg_menu">
          <div className="veg_container">
            <div className="veg_menu-tab">
              <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                  <a className="header">VEG RECIPIES</a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="burgers" className="container tab-pane active">
                  <div className="row">
                    <div className="col-lg-7 col-md-12"> </div>
                    <div className="veg_menu-item">
                      {" "}
                      <div className="veg_menu-img">
                        <img src={rice} alt="panner" />
                      </div>
                      <div className="veg_menu-text">
                        <h3>
                          <span>VEG THALI</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Veg Thali", price: 40 })
                            }
                          >
                            rs-40
                          </button>
                        </h3>
                        <p>Rice, Dal, Sabji</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={panner} alt="panner" />
                      </div>
                      <div className="menu-text">
                        <h3>
                          <span>PANNER</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Paneer sabji", price: 35 })
                            }
                          >
                            rs-35
                          </button>
                        </h3>
                        <p>Panner sabji</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={rotipaner} alt="rotipaner" />
                      </div>{" "}
                      <div className="veg_menu-text">
                        <h3>
                          <span>ROTI & PANNER</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Roti & paneer", price: 60 })
                            }
                          >
                            {" "}
                            rs-60
                          </button>
                        </h3>
                        <p>3 piece roti with panner sabji</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={bhaja1} alt="bhaja" />
                      </div>
                      <div className="veg_menu-text">
                        {" "}
                        <h3>
                          <span>BHAJA</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Bhaja", price: 10 })
                            }
                          >
                            {" "}
                            rs-10
                          </button>
                        </h3>
                        <p>Bhaja</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {cartItems={cartItems} } */}
      {/* {<Cart cartItems={cartItems} /> } */}
    </div>
  );
};

export default Veg;
