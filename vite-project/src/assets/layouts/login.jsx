import React, { useState } from "react";
import axios from "axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = (credentials) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function getCookieByName(name){
    const cookies = document.cookie;
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const desiredCookie = cookieArray.find(cookie => cookie.startsWith(`${name}=`));
    if (desiredCookie) {
      const [, value] = desiredCookie.split('=');
      return value;
    } else {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3001/", { email, password })
        .then(async (result) => {
          if (result.status === 202) {
            const token = result.data.token;
            const cookies = getCookieByName('cookie-1');
            console.log("login success",cookies);
            try {
              await axios
                .get("http://localhost:3001/user/verifyjwt", {
                  headers:{
                    'cookie-1': cookies
                  },
                })
                .then((details) => {
                  if (details.status === 200) {
                    navigate("/user/home");
                  } else {
                    console.log("Unauthorized or Invalid token");
                    navigate("/");
                  }
                });
            } catch (error) {
              console.log(
                "You dont have permission to access this routes ! please logged in first"
              );
            }
          } else {
            console.log("Incorrect login credentials");
          }
        });
    } catch (error) {
      console.log("Error!", error);
    }
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="input"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field button-field">
              <button>Login</button>
            </div>
          </form>

          <div className="form-link">
            <a href="/forgotpassword" className="forgot-pass">
              Forgot password?
            </a>
          </div>
          <div className="form-link">
            <span>
              Don't have an account?{" "}
              <a href="signup" className="link signup-link">
                Signup
              </a>
            </span>
          </div>
        </div>

        <div className="line"></div>
        <div className="media-options">
          <a href="admin/login" className="field facebook">
            <i className="bx bxl-facebook facebook-icon"></i>
            <span>Admin login</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
