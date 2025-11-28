import React, { useState } from 'react';
import axios from 'axios'; 
import './Login.css';
import { useNavigate } from 'react-router-dom';

const petImage = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const endpoint = isLogin 
      ? 'http://localhost:8080/api/auth/login' 
      : 'http://localhost:8080/api/auth/signup';

    try {
      const response = await axios.post(endpoint, formData);
      
      alert(response.data); 
      if (response.data === "Login Successful" || response.data === "User registered successfully!") {
       navigate('/home');}
      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Check the console.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="image-side">
          <img src={petImage} alt="Cute Pet" />
          <div className="overlay">
            <h2>Pet Toy Paradise</h2>
            <p>Treat your best friend today.</p>
          </div>
        </div>

        <div className="form-side">
          <h2>{isLogin ? 'Welcome Back' : 'Join the Family'}</h2>
          
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="Your Name" 
                  onChange={handleChange} 
                />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="email@example.com" 
                onChange={handleChange} 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="********" 
                onChange={handleChange} 
              />
            </div>

            <button type="submit" className="submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="switch-text">
            {isLogin ? "New here? " : "Already have an account? "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create Account' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;