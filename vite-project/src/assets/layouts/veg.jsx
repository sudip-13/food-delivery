import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./cart.jsx";
import "../styles/veg.css";
import rice from "../images/rice.jpg";
import panner from "../images/panner.jpg";
import rotipaner from "../images/rotipaner.jpg";
import bhaja1 from "../images/bhaja1.jpg";

const Veg = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

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
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
};

export default Veg;
