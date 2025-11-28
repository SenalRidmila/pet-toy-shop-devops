import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Home from './Home';
import Cart from './Cart';
import Admin from './Admin'; 

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Home Page Route */}
        <Route 
          path="/home" 
          element={<Home cart={cart} addToCart={addToCart} />} 
        />
        
        {/* Cart Page Route */}
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              removeFromCart={removeFromCart} 
              clearCart={clearCart} 
            />
          } 
        />

        {/* 2. Admin Route එක මෙතන හරියටම දාන්න ඕන */}
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;