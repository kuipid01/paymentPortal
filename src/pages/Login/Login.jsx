/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.scss'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import  {useNavigate}  from 'react-router-dom' 
import { AppContext } from '../../contexts/AppContext';
const Login = () => {
const { users, setCurUser, getUsers } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    
 
    event.preventDefault();
    getUsers();

    const user = users.find(u => u.email === email);

    if (user) {
      const validPassword =  password===user.password;
      if (validPassword) {
        setCurUser(user);
        sessionStorage.setItem('curUser', JSON.stringify(user));
        navigate('/');
      } else {
        alert('Invalid login info!');
      }
    } else {
      alert('Invalid login info!');
    }
  
    // Perform authentication logic here (e.g., check username and password)
    // For simplicity, let's assume authentication is successful
    // In a real-world scenario, you would likely use an authentication service

 
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Login</button>
      </form>
            <div>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
    </div>
  );
};

export default Login;