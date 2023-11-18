import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Redux/actions/authActions';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.user !== null);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      // Navigate to the home page after successful logout
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure, if necessary
    }
  };

  return (
    <div className="navbar">
      {/* Logo on the left */}
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Courses Listing
        </Link>
      </div>

      {/* Links in the center */}
      <div className="nav-links">
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          Home
        </Link>
        <Link to="/courses" style={{ textDecoration: 'none', color: 'white' }}>
          Courses
        </Link>
      </div>

      {/* Conditional rendering for auth buttons */}
      <div className="auth-buttons">
        {isLoggedIn ? (
          <span>
            <button onClick={handleLogout} style={{ color: '#fff', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </span>
        ) : (
          <>
            <span style={{ background: '#fff', color: '#333' }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register
              </Link>
            </span>
            <span>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                Login
              </Link>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
