import { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import ButtonComponent from './ButtonComponent';
import { addDoc } from 'firebase/firestore';

const Register = () => {
  const { users, usersCollectionRef, getUsers } = useContext(AppContext);
  const navigate = useNavigate();

  const [btnText, setBtnText] = useState('Register');
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
 

  const handleRegister = async e => {
    e.preventDefault();

    if (password === confirmPassword) {
      if (!users.map(u => u.email).includes(email)) {
        setBtnDisabled(true);

        
        const newUser = { email, password: password, name, surname, permission: 'user' };
        await addDoc(usersCollectionRef, newUser);
        getUsers();

        setBtnText('✓ User created');
        setTimeout(() => {
          navigate(`/login`);
        }, '1000');
      } else {
        alert('Email address already taken!');
      }
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <>
     <div className="flex  w-full  bg-gradient-to-br from-gray-800 to-gray-900 text-gray-700  mx-auto  h-screen  rounded-md shadow-md">
      {/* Left Section with Image */}
      <div className="md:w-1/2 hidden">
        <img
          src="https://images.unsplash.com/photo-1548413935-a7d015ff5865?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual image source
          alt="Left Section Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section with Form */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className='font-bold text-3xl text-white uppercase'>Sign Up </h1>
      <form onSubmit={handleRegister} className="my-8 w-[80%] h-fit mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          onChange={(e) =>
            setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
          }
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
          Surname
        </label>
        <input
          type="text"
          id="surname"
          placeholder="Enter your surname"
          onChange={(e) =>
            setSurname(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
          }
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your e-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          minLength="6"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repeat password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={btnDisabled}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
      >
        {btnText}
      </button>
    </form>
      </div>
    </div>
      
    </>
  );
};

export default Register;
