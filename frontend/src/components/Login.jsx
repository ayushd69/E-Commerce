import React, { useState } from 'react';

const Login = ({ setCurrentPage, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if it is the admin
    if (email === 'admin@gmail.com' && password === 'admin123') {
      if (onLogin) onLogin('Admin', email);
    } else {
      // Normal user (mocked)
      const mockName = email.split('@')[0];
      if (onLogin) onLogin(mockName, email);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to your LuminaStore account</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email" 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="auth-submit-btn">Login</button>
        </form>
        <div className="auth-switch">
          Don't have an account? <span onClick={() => setCurrentPage('register')}>Register here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
