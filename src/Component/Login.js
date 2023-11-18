// LoginForm.js
import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { loginUser } from '../Redux/actions/authActions';
import './styles/Login.css';
import StudentDashboard from './StudentDashboard';

const LoginForm = ({ loginUser, loading, error }) => {
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);

    // Check if login is successful, then navigate to the "courses" page
    if (!loading && !error) {
      navigate('/student-dashboard');
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <h2 style={{ textAlign: 'center', margin: '25px 0px 10px 0' }}> Student Login</h2>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <form className='login-form' onSubmit={handleSubmit}>
              <label className='login-label'>Email:</label>
              <input className='login-input' type="email" name="email" value={credentials.email} onChange={handleChange} required />

              <label className='login-label'>Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className='login-input'
              />

              <button className='login-btn' type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/courses" style={{ textDecoration: 'none', color: '#000', marginLeft: '10px' }}>
              <button>Go to Courses</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
