import React, { useState } from 'react';

const Register = ({ setCurrentPage, onLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate registration and auto-login
    alert(`Account created successfully for ${name}!`);
    if (onRegister) onRegister(name, email);
    if (onLogin) onLogin(name, email);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p>Join the LuminaStore family today</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              placeholder="John Doe" 
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com" 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="Create a strong password" 
            />
          </div>
          <button type="submit" className="auth-submit-btn">Create Account</button>
        </form>
        <div className="auth-switch">
          Already have an account? <span onClick={() => setCurrentPage('login')}>Login here</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
