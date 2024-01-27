import React,{ useState } from "react";
import '../styles/cart.css'
import { json } from "react-router-dom";
// import cartItems from'./veg'


const Cart = ()=> {
  let [cartItems, setCartItems] = useState([]);
  let sessionString=sessionStorage.getItem('Cart_item')
  cartItems=JSON.parse(sessionString)
  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    sessionStorage.setItem("Cart_item",JSON.stringify(newCartItems))
  };
  return (
    <div className="cart">
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
    </div>
  );
};

export default Cart;