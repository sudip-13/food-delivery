import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./cart.jsx";
import "../styles/veg.css";
import fish from "../images/fish.jpg";
import biriyani from "../images/biriyani.jpg";
import chicken from "../images/chicken.jpg";
import chicken_thali from "../images/chicken-thali.jpg";

const NonVeg = () => {
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
                  <a className="header">NON-VEG RECIPIES</a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="burgers" className="container tab-pane active">
                  <div className="row">
                    <div className="col-lg-7 col-md-12"> </div>
                    <div className="veg_menu-item">
                      {" "}
                      <div className="veg_menu-img">
                        <img src={chicken} alt="panner" />
                      </div>
                      <div className="veg_menu-text">
                        <h3>
                          <span>CHICKEN CURRY</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Chicken curry", price: 80 })
                            }
                          >
                            rs-80
                          </button>
                        </h3>
                        <p>Chicken Curry</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={fish} alt="panner" />
                      </div>
                      <div className="menu-text">
                        <h3>
                          <span>FISH CURRY</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Fish curry", price: 50 })
                            }
                          >
                            rs-50
                          </button>
                        </h3>
                        <p>Fish Curry</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={biriyani} alt="rotipaner" />
                      </div>{" "}
                      <div className="veg_menu-text">
                        <h3>
                          <span>BIRIYANI</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Biriyani", price: 160 })
                            }
                          >
                            {" "}
                            rs-160
                          </button>
                        </h3>
                        <p>Hydrabadi Biriyani</p>
                      </div>
                    </div>
                    <div className="veg_menu-item">
                      <div className="veg_menu-img">
                        <img src={chicken_thali} alt="bhaja" />
                      </div>
                      <div className="veg_menu-text">
                        {" "}
                        <h3>
                          <span>CHICKEN THALI</span>{" "}
                          <button
                            className="veg_btn"
                            onClick={() =>
                              addToCart({ name: "Chicken thali", price: 100 })
                            }
                          >
                            {" "}
                            rs-100
                          </button>
                        </h3>
                        <p>Rice, Sabji, Chicken</p>
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

export default NonVeg;
