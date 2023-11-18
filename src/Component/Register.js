import React, { useState } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../Redux/actions/userAction';

import './styles/Register.css';

const Register = ({ registerUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    phoneNumber: '',
    passwordMatch: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'phoneNumber') {
      const isNumeric = /^[0-9]+$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: isNumeric ? '' : <span style={{color:'red', fontSize:'12px', margin:'0'}}>Phone number should contain only numbers.</span>,
      }));
    }

    if (name === 'confirmPassword') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordMatch: formData.password === value ? '' : <span style={{color:'red', fontSize:'12px', margin:'0'}}>Password do not match</span>
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors before submitting
    if (errors.phoneNumber || errors.passwordMatch) {
      // Display error messages
      return;
    }

    registerUser(formData); // Dispatch the async action
  };

  return (
    <div className="register-container">
      <div className="card-container">
        <h1>Student Registration</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='register-input'
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='register-input'
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className='register-input'
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className='register-input'
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className='register-input'
          />
          {errors.passwordMatch && <p className="error-message">{errors.passwordMatch}</p>}

          <button className='register-btn' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { registerUser })(Register);
