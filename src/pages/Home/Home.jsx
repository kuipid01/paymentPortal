/* eslint-disable no-unused-vars */
import React from 'react'
import './home.scss'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'
const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform authentication logic here (e.g., check username and password)
    // For simplicity, let's assume authentication is successful
    // In a real-world scenario, you would likely use an authentication service

    // Redirect to the account page
    history.push('/account');
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
          value={username}
          onChange={handleUsernameChange}
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
    </div>
  );
};

export default Home;