// src/App.jsx
import React,{useEffect} from 'react';
import '../styles/orderplaced.css';
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

function OrderPlaced(){
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
            .then((details) => {
              if (details.status === 403 || details.status === 401) {
                console.log("Token missing or invalid");
                navigate("/");
              }
            });
        } catch (error) {
          console.error(
            "You dont have permission to access this routes ! please logged in first "
          );
        }
      }
    useEffect(() => {
        validation();
      });



  



  return (
    <div className="body_orderplace">
    <div className="container_orderplaced">
      <div className='header_orderplace'>
        <h1>Congratulations!</h1>
        <p>Your order has been successfully placed.</p>
        </div>
        <div className="main_orderplaced">
        <p>Thank you for choosing our services. We appreciate your business.</p>
        {/* You can add more information or details about the order here */}
        <button onClick={() => navigate("/user/home")}>Go to Home</button>
        </div>
    <div className="footer_orderplaced">
        <p>&copy; {new Date().getFullYear()} Your Company Name</p>
        </div>
    </div>

    </div>
  );
}

export default OrderPlaced;
