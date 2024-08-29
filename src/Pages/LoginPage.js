import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // Import Link
import '../styles/LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/Home');
    } catch (error) {
      // Set the error message from backend
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {message && <p className="login-message">{message}</p>}
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="create-account-link">
        Don't have an account? <Link to="/Signup">Create one here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
