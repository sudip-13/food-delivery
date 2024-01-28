import "../styles/cart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getCookieValueByName from "./cookie.js";

const Cart = () => {
  let [cartItems, setCartItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [jsonObject, setJsonObject] = useState('');
  const navigate = useNavigate();
  let sessionString = sessionStorage.getItem("Cart_item");
  cartItems = JSON.parse(sessionString);



  
    

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

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    sessionStorage.setItem("Cart_item", JSON.stringify(newCartItems));
    window.location.reload()
  };

  useEffect(() => {
    validation();
  });


  const handleAddToCart=async()=>{
    const token = await getCookieValueByName("cookie-1");
    let email=null
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
      }
      catch(error){
        console.log('failed to fetch email',error)
      }
    const orderStatus='saved to cart'
    try{
      await axios
      .post("http://localhost:3001/user/setcart",{cartItems,email,orderStatus})
      .then((result)=>{
        if(result.status===200){
          console.log(result.data)
        }
        else{
          console.log("Failed to update cart")
        }
      })

    }
    catch(error){
      console.log(error)
    }
    window.location.reload();
  }


  const fetchCartAndShow = async (e) => {
    let email = null;
    const token = await getCookieValueByName("cookie-1");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
      try {
        await axios
          .post("http://localhost:3001/user/getcart", { email })
          .then((result) => {

            const jsonObject=result.data
            const itemName = jsonObject.item_name.join(', '); // Join array elements into a string
            const totalPrice = jsonObject.price.reduce((sum, price) => sum + price, 0); // Calculate total price
            setItemName(itemName);
            setTotalPrice(totalPrice)
            setJsonObject(jsonObject)
          
          });
      } catch (error) {
        console.error("Internal server error !", error);
      }
    } catch (error) {
      console.error("Internal server error !", error);
    }
  };


  useEffect(() => {
    fetchCartAndShow();
  }, []);

  const handleNavigation = async (e) => {
    let email = null;
    const token = await getCookieValueByName("cookie-1");
    try {
      await axios
        .post("http://localhost:3001/user/decode", { token })
        .then((result) => {
          email = result.data;
        });
        try {
          await axios
            .post("http://localhost:3001/user/settotalprice", { email ,totalPrice})
            .then((result) => {
              if(result.status===200){
                console.log(result.data)
              }
              else{
                console.log("Failed to fetch above details")
              }
        })
      }
      catch(error){
          console.log('check order carefully',error)
      }
    }
    catch(error){
      console.log('failed to fetch email',error)
    }
    navigate('/user/confirmorder')
  }

  const isOrderSavedPayment=
  jsonObject.orderStatus === 'saved to cart' || jsonObject.orderStatus === 'make payment';


  return (
   
    <div className="cart">
       <div className="unsaved">
      <h2>Food Cart</h2>
      {cartItems === null ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - Rs {item.price}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="cartbtn">
      <button onClick={() => handleAddToCart()}>Add to Cart</button>
      
      </div>
      </div>
      <div className="saved">
      <div>
      <h1>Saved Details</h1>
      <div>
      {isOrderSavedPayment ? (
        <>
      <p><strong>Item Name:</strong> {itemName}</p>
      <p><strong>Total Price:</strong> {totalPrice}</p>
      <p><strong>Order Status:</strong> {jsonObject.orderStatus}</p>
      </>
      ):
      (
        <p>Order status is not "saved to cart" or "make payment".</p>
      )}
    </div>
    </div>
    <button onClick={() => handleNavigation()}>Connfirm Order</button>
    </div>
      </div>
  );
};

export default Cart;
