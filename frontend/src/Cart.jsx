import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 

const Cart = ({ cart, removeFromCart, clearCart }) => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);


  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful! Thank you for your order.");
    clearCart(); 
    navigate('/home'); 
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart 🛒</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/home')}>Go Shopping</button>
        </div>
      ) : (
        <div className="cart-content">
          {}
          <div className="item-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price}</p>
                </div>
                {}
                <button 
                  className="delete-btn" 
                  onClick={() => removeFromCart(index)}
                >
                  Remove ❌
                </button>
              </div>
            ))}
          </div>

          {}
          <div className="checkout-section">
            <h3>Total: Rs. {totalPrice}</h3>
            
            {!showPayment ? (
              <button className="checkout-btn" onClick={() => setShowPayment(true)}>
                Proceed to Checkout
              </button>
            ) : (
              <form className="payment-form" onSubmit={handlePayment}>
                <h4>Card Details</h4>
                <input type="text" placeholder="Card Number" required />
                <div className="card-row">
                  <input type="text" placeholder="MM/YY" required />
                  <input type="text" placeholder="CVC" required />
                </div>
                <button type="submit" className="pay-btn">Pay Rs. {totalPrice}</button>
                <button type="button" className="cancel-btn" onClick={() => setShowPayment(false)}>Cancel</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;