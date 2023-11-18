/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.scss'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const Login = () => {
  const { users, setCurUser, getUsers } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);



  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
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
      const validPassword = password === user.password;
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
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700">
      <h1 className='text-white text-2xl'>Login</h1>
      <form onSubmit={handleSubmit} className=" w-[80%] md:w-1/2 lg:w-1/2 mx-auto p-4 shadow-md rounded-md bg-white">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="relative mt-1">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="p-2 pr-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <div

            onClick={handleTogglePasswordVisibility}
            className="absolute  w-fit h-[20px] cursor-pointer top-1/2 -translate-y-1/2  right-2 flex items-center focus:outline-none"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>

      <div className='mt-3'>
        Don't have an account? <Link className='text-white' to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;