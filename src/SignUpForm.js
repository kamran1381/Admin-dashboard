import React, { useState } from 'react';

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    localStorage.setItem('name', event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    localStorage.setItem('email', event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the user data in localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    // Invoke the onSignup callback with the user data
    onSignup({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit" >Sign Up</button>
    </form>
  );
};

export default SignupForm;
