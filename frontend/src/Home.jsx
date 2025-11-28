import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ cart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate('/cart'); 
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>🐾 Pet Toy Market</h1>
        <div className="cart-icon">
          {}
          <button onClick={() => navigate('/cart')} className="view-cart-btn">
             🛒 Cart ({cart.length})
          </button>
          <button onClick={() => navigate('/')} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="market-area">
        <h2>New Arrivals</h2>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <div className="card-details">
                <h3>{item.name}</h3>
                <p className="price">Rs. {item.price}</p>
                
                <div className="button-group">
                  {}
                  <button 
                    className="add-btn"
                    onClick={() => {
                      addToCart(item);
                      alert("Added to Cart!");
                    }}
                  >
                    Add to Cart ➕
                  </button>

                  {}
                  <button 
                    className="buy-btn"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now 
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;